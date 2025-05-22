import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetChannelsQuery, selectCurrentChannel, channelsApi } from '../slices/channelsSlice.js'
import ChannelsList from './ChannelsList.jsx'
import Chat from './Chat.jsx'
import Container from 'react-bootstrap/esm/Container.js'
import Row from 'react-bootstrap/Row'
import getModal from './modals/index.js'

const renderModal = ({ modalInfo, hideModal, channels }) => {
  if (!modalInfo.type) return null
  const ModalComponent = getModal(modalInfo.type)
  return (
    <ModalComponent
      modalInfo={modalInfo}
      onHide={hideModal}
      channels={channels}
    />
  )
}

function HomePage() {
  const { data: channels, isSuccess } = useGetChannelsQuery()

  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const currentChannel = channels && channels.find(channel => channel.id === currentChannelId)
  const [modalInfo, setModalInfo] = useState({ type: null, item: null })
  const hideModal = () => setModalInfo({ type: null, item: null })
  const showModal = (type, item = null) => setModalInfo({ type, item })

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        { isSuccess && (<ChannelsList currentChannel={currentChannel} channels={channels} showModal={showModal} />) }
        { currentChannel && (<Chat currentChannel={currentChannel} />) }
      </Row>
      {renderModal({ modalInfo, hideModal, channels })}
    </Container>
  )
}

export default HomePage
