import React, { useState, useCallback } from 'react'
import {
    Card,
    CardImg,
    CardText,
    ReleaseDate,
    CardIconContainer,
    CardTooltipContainer,
    CardTooltipItem
} from '../styles'
import PropTypes from 'prop-types';
import { DotsVerticalRounded } from '@styled-icons/boxicons-regular'
import { Modal, ModalContent } from './../components';
import { connect } from 'react-redux'
import { fetchMovieRequest } from './../redux'

const MovieCard = ({ img, title, genre, releaseDate, rating, imgAlt, url, movieId, overview, runtime, fetchMovie }) => {

    const [showModal, setShowModal] = useState(false)
    const [showIcon, setShowIcon] = useState(false)
    const [displayToolTip, setDisplayToolTip] = useState(false)
    const [modalType, setModalType] = useState('EDIT')
    const [modalData, setModalData] = useState({
        title,
        url,
        releaseDate,
        movieId,
        overview,
        runtime,
        genre,
    })
    const showToolTip = () => {
        setDisplayToolTip(true)
    }

    const closeToolTip = () => {
        setDisplayToolTip(false)
    }

    const openEditModal = () => {
        setDisplayToolTip(false)
        setModalType('EDIT')
        setShowModal(true)
    }

    const openDeleteModal = () => {
        setDisplayToolTip(false)
        setModalType('DELETE')
        setShowModal(true)
    }

    const handleInput = (e) => {
        setModalData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        console.log(modalData)
        console.log(new Date(2000,4,3).toISOString().split('T')[0])

    }

    const showDetails = useCallback(
        () => {
            fetchMovie({
                title,
                genre,
                releaseDate,
                img,
                overview,
                runtime,
                rating,
                show: true
            })
        },
        [img, fetchMovie, title, genre, releaseDate, rating, overview, runtime]
    )

    return (
        <Card onClick={showDetails} onMouseOver={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}>
            <CardImg src={img} alt={imgAlt} />
            {
                showIcon
                    ? <CardIconContainer><DotsVerticalRounded onClick={showToolTip} color='#232323' size="50" /></CardIconContainer>
                    : null
            }
            {
                displayToolTip
                    ? <CardTooltipContainer>
                        <span onClick={closeToolTip} style={{ paddingLeft: '100px', }} >&times;</span>
                        <CardTooltipItem onClick={openEditModal}>EDIT</CardTooltipItem>
                        <CardTooltipItem onClick={openDeleteModal}>DELETE</CardTooltipItem>

                    </CardTooltipContainer>
                    : null
            }
            <CardText>
                <h3>{title}<ReleaseDate>{releaseDate}</ReleaseDate></h3>
                <p>{genre}</p>
            </CardText>
            {
                showModal ? (
                    <Modal>
                        <ModalContent
                            modalData={modalData}
                            handleInput={handleInput}
                            modalType={modalType}
                            toggleModal={() => setShowModal(!showModal)}
                        />
                    </Modal>
                ) : null
            }
        </Card>
    )
}

MovieCard.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}

MovieCard.defaultProps = {
    img: 'https://unsplash.it/800/600?image=11',
    title: 'NO TITLE',
    genre: 'NO GENRE',
    releaseDate: '0',
    imgAlt: 'NO IMAGE',
    url: 'NO URL'
};

const mapDispatchToProps = dispatch => {
    return {
       fetchMovie: (show) => dispatch(fetchMovieRequest(show))
    }
}

export default connect(null, mapDispatchToProps)(MovieCard)
