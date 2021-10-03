import Pat from "../images/Pat.JPG"
import github from "../images/github.png"
import './Home.css'
import {useSelector} from 'react-redux';

function Home() {

    const currentUser = useSelector(state => state.session.user)
    if (!currentUser) {
        return (
            <div className="home__wrapper">
                <div className="home__page--display">
                    <h1>Welcome To Center Stage</h1>
                    <p>
                        Center Stage is your new stop to find out where your favorite artist is going to be next, or you could check out your local venue to see who's coming next!
                        Are you ready to be Center Stage?
                    </p>
                </div>
                <div className="about-me-section">
                    <h2>Our Contributor</h2>
                    <a href='https://github.com/cpowers1203' target="_blank" rel="noopener noreferrer"><img src={Pat} alt='' onMouseOver={(e) => e.currentTarget.src = github} onMouseOut={(e) => e.currentTarget.src = Pat} /></a>
                    <a href='https://www.linkedin.com/in/colton-powers-95bba315a/' target="_blank" rel="noopener noreferrer"><h3>Colton Powers</h3></a>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="home__wrapper">
                <div className="home__page--display">
                    <h1>Welcome Back To Center Stage</h1>
                    <p>
                        Center Stage welcomes you back to your stop to find out where your favorite artist is going to be next, and to check out your local venue to see who's coming next!
                        Center Stage is yours!
                    </p>
                </div>
                <div className="about-me-section">
                    <h2>Our Contributor</h2>
                    <a href='https://github.com/cpowers1203' target="_blank" rel="noopener noreferrer"><img src={Pat} alt='' onMouseOver={(e) => e.currentTarget.src = github} onMouseOut={(e) => e.currentTarget.src = Pat} /></a>
                    <a href='https://www.linkedin.com/in/colton-powers-95bba315a/' target="_blank" rel="noopener noreferrer"><h3>Colton Powers</h3></a>
                </div>
            </div>
        )
    }
}

export default Home