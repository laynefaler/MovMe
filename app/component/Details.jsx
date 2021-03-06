import React from 'react'
import axios from 'axios'
import { Button, Carousel, CarouselCaption, CarouselItem, Grid, Col, Row, Thumbnail } from 'react-bootstrap'
import  FontAwesome from 'react-fontawesome'

export default class Details extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currMovie: {},
            clicked: false
        }
    }

    componentWillMount() {
        let object = window.localStorage.getItem('currentMovie')
        let realObject = JSON.parse(object)
        this.setState({ currMovie: realObject })
    }

    postMovieInfo() {
        this.setState({ clicked: !this.state.clicked })
        axios.post('/api/favorites', {
                poster_path: this.state.currMovie.poster_path,
                title: this.state.currMovie.title,
                overview: this.state.currMovie.overview,
                vote_average: JSON.stringify(this.state.currMovie.vote_average)
            })
            .then((resp) => {
                console.log(`postMovieInfo successful`)
            })
            .catch((err) => {
                console.log(`postMovieInfo error: ${err}`)
            })
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={6} md={4}>
                            <Thumbnail src={'https://image.tmdb.org/t/p/w500' + this.state.currMovie.poster_path}>
                                <h3>{this.state.currMovie.title}</h3>
                                <p>{this.state.currMovie.overview}</p>
                                <Button bsClass="favButtons" onClick={this.postMovieInfo.bind(this)}>
                                {this.state.clicked ?
                                    (<FontAwesome
                                        name='heart'
                                        size='2x' />)
                                    : (<FontAwesome
                                        name='heart-o'
                                        size='2x'
                                    />) }
                                    </Button>
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>
            </div>
            )
        }
}