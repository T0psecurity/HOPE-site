import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { TransferDialog } from 'features/assets/components/TransferDialog'
import { useConnectIBCWallet } from 'hooks/useConnectIBCWallet'
import { toast } from 'react-hot-toast'
import { AppLayout } from 'components/Layout/AppLayout'
import { PageHeader } from 'components/Layout/PageHeader'
import { AssetsList } from 'features/assets/components/AssetsList'
import { useConnectWallet } from 'hooks/useConnectWallet'
import { useRecoilValue } from 'recoil'
import { walletState, WalletStatusType } from 'state/atoms/walletAtoms'
import { Toast } from 'components/Toast'
import { IconWrapper } from 'components/IconWrapper'
import { Error } from 'icons/Error'
import { Button } from 'components/Button'
import { UpRightArrow } from 'icons/UpRightArrow'

export default function Transfer() {
  const [
    { transactionKind, isTransferDialogShowing, selectedToken },
    updateState,
  ] = useReducer((store, updatedStore) => ({ ...store, ...updatedStore }), {
    transactionKind: 'deposit',
    isTransferDialogShowing: false,
    selectedToken: null,
  })

  function handleAssetCardActionClick({ actionType, tokenSymbol }) {
    updateState({
      transactionKind: actionType,
      selectedToken: tokenSymbol,
      isTransferDialogShowing: true,
    })
  }

  function handleUpdateSelectedToken(tokenSymbol: string) {
    updateState({
      selectedToken: tokenSymbol,
    })
  }

  function handleTransferDialogClose() {
    updateState({ isTransferDialogShowing: false })
  }

  const { mutate: connectExternalWallet } = useConnectIBCWallet(selectedToken, {
    onError(error) {
      toast.custom((t) => (
        <Toast
          icon={<IconWrapper icon={<Error />} color="error" />}
          title={`Cannot get wallet address for ${selectedToken}`}
          body={error?.toString()}
          buttons={
            <Button
              as="a"
              variant="ghost"
              href={process.env.NEXT_PUBLIC_FEEDBACK_LINK}
              target="__blank"
              iconRight={<UpRightArrow />}
            >
              Provide feedback
            </Button>
          }
          onClose={() => toast.dismiss(t.id)}
        />
      ))
    },
  })

  const { mutate: connectInternalWallet } = useConnectWallet({
    onError(error) {
      toast.custom((t) => (
        <Toast
          icon={<IconWrapper icon={<Error />} color="error" />}
          title="Cannot connect to your wallet"
          body={
            (error as any)?.message ?? error?.toString() ?? 'Unknown error.'
          }
          buttons={
            <Button
              as="a"
              variant="ghost"
              href={process.env.NEXT_PUBLIC_FEEDBACK_LINK}
              target="__blank"
              iconRight={<UpRightArrow />}
            >
              Provide feedback
            </Button>
          }
          onClose={() => toast.dismiss(t.id)}
        />
      ))
    },
  })

  const { status } = useRecoilValue(walletState)
  useEffect(() => {
    async function connectInternalAndExternalWallets() {
      if (status !== WalletStatusType.connected) {
        console.log('going to connect internal wallet first')
        await connectInternalWallet(null)
      }

      connectExternalWallet(null)
    }

    // connect wallet as soon as a token is selected
    if (selectedToken) {
      connectInternalAndExternalWallets()
    }
  }, [connectExternalWallet, connectInternalWallet, selectedToken, status])

  return (
    <>
      <AppLayout>
        <StyledWrapper>
          <PageHeader
            title="IBC Transfer"
            subtitle="Easily and quickly initiate payments across IBC."
          />
          <AssetsList onActionClick={handleAssetCardActionClick} />
        </StyledWrapper>
      </AppLayout>
      {selectedToken && (
        <TransferDialog
          tokenSymbol={selectedToken}
          transactionKind={transactionKind}
          isShowing={isTransferDialogShowing}
          onTokenSelect={handleUpdateSelectedToken}
          onRequestClose={handleTransferDialogClose}
        />
      )}
    </>
  )
}

const StyledWrapper = styled.section`
  padding-bottom: 34px;
`
