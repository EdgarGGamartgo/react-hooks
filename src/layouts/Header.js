import React, { useState, useCallback, useEffect } from 'react'
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
import MovieDetails from './../components/MovieDetails'
import { connect } from 'react-redux'
import { fetchMovieRequest } from './../redux'

const Header = ({ className, showMovieDetails, fetchMovie }) =>  {

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

    useEffect(() => {
        fetchMovie({
            show: false
        })
    }, [fetchMovie])

    const showSearch = useCallback(
        () => {
            fetchMovie({
                show: false
            })
        },
        [fetchMovie]
    )

        return (
            <div className={className}>
                {
                    showMovieDetails 
                    ? <MovieDetails showSearch={showSearch}/>
                    : <><Paragraph>netflixroulette</Paragraph>
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
                        }</>
                }
            </div>
        )
    
}

const mapStateToProps = state => {
    return {
        showMovieDetails: state.movie.show
    }
}

const mapDispatchToProps = dispatch => {
    return {
       fetchMovie: (show) => dispatch(fetchMovieRequest(show))
    }
}

Header.propTypes = {
    className: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
