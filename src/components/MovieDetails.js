import React from 'react'
import { 
    DetailsContainer,
    Paragraph,
    ImgDetailsContainer,
    ParDetailsContainer,
    DetailsTitle,
    DetailsSubTitle,
    DetailsSpan,
    ImgDetails,
    CircleWithText,
    HeaderSearchIcon,
} from './../styles'
import PropTypes from 'prop-types';



const MovieDetails = ({ img, title, rating, genre, releaseDate, duration, desc }) => {
    return (
        <>
            <Paragraph>netflixroulette</Paragraph>
            <HeaderSearchIcon color='#F65261' size="30"/>
            <DetailsContainer>
                <ImgDetailsContainer><ImgDetails src={img} alt="details" /></ImgDetailsContainer>
                <ParDetailsContainer>
                    <DetailsTitle>{title}<CircleWithText>{rating}</CircleWithText></DetailsTitle>
                    <DetailsSubTitle>{genre}</DetailsSubTitle>
                    <DetailsSubTitle><DetailsSpan>{releaseDate}</DetailsSpan>&nbsp;&nbsp;&nbsp;<DetailsSpan>{duration}</DetailsSpan></DetailsSubTitle>
                    <DetailsSubTitle>
                    {desc}<br/> 
                    {/* Max number of characters 79 */}
                    </DetailsSubTitle>
                </ParDetailsContainer>
            </DetailsContainer>
        </>
    )
}

MovieDetails.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
}

MovieDetails.defaultProps = {
    img: 'https://unsplash.it/800/600?image=11',
    title: 'Pulp Fiction',
    rating: '4.3',
    genre: 'Oscar winning Movie',
    releaseDate: '1994',
    duration: '154 min',
    desc: 'A description...'
};

export  { MovieDetails }
