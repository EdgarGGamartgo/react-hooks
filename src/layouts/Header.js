import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { 
    ParagraphTitle,
    Paragraph,
    ButtonSearch,
    Button,
    Input
} from './../styles'
import PropTypes from 'prop-types';
import { Modal, ModalContent } from './../components';

const Header = ({ className }) =>  {

    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState({
        title: '',
        url: '',
        releaseDate: '',
        movieId: '',
        overview: '',
        runtime: '',
        genre: '',
    })

    const toggleModal = () => {
        setShowModal(!showModal)
     };

    const handleInput = (e) => {
        console.log(e.target)
        setModalData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

        return (
            <div className={className}>
                    <Paragraph>netflixroulette</Paragraph>
                    <Button onClick={toggleModal}>+ ADD MOVIE</Button>
                    <ThemeProvider theme={ParagraphTitle}>
                        <Paragraph>FIND YOUR MOVIE</Paragraph>
                    </ThemeProvider>
                    <Input placeholder="What do you want to watch?"/>
                    <ButtonSearch>SEARCH</ButtonSearch>
                    {
                        showModal ? (
                            <Modal>
                                <ModalContent
                                    modalData={modalData}
                                    handleInput={handleInput}
                                    modalType="ADD"
                                    toggleModal={toggleModal}
                                />
                            </Modal>
                        ) : null
                    }
            </div>
        )
    
}

Header.propTypes = {
    className: PropTypes.string.isRequired,
}

export  { Header }
