import Pat from "../images/Pat.JPG"
import github from "../images/github.png"
import './Home.css'

function Home() {
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
                <a href='https://github.com/cpowers1203' ><img src={Pat} alt='' onMouseOver={(e) => e.currentTarget.src = github} onMouseOut={(e) => e.currentTarget.src = Pat} /></a>
                <h3>Colton Powers</h3>
            </div>
        </div>
    )
}

export default Home