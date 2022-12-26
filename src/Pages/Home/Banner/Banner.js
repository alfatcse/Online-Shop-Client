import React from 'react';

const Banner = () => {
    return (
        <div className="hero min-h-screen bg-base-200 mx-auto max-w-6xl mt-4">
            <div className="hero-content items-center flex-col lg:flex-row-reverse">
                <img src="https://i.ibb.co/z74nscB/full-length-portrait-excited-family.jpg" className="max-w-sm rounded-lg shadow-2xl" alt=''/>
                <div>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;