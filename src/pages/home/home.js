import './home.css'


export default function Home() {
    return (
        <div>
            <Poster />
        </div>
    )
}

function Poster() {
    return (
        <div className='poster'>
            <div className='backingImage'></div>
            <h2 className='poster-header'>Bringing our Ideas to Life.<br/>
                Through our expertise.
            </h2>
            <div className='poster-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
        </div>

    )
}