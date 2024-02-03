import { useState, useEffect } from "react";

export function Card () {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [advice, setAdvice] = useState("It is easy to sit up and take notice, what's difficult is getting up and taking action.")
    const [adviceId, setAdviceId] = useState(117)

    async function fetchAdvice() {
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`)
            }
            const data = await response.json();
            return data
        } catch (error) {
            console.error(error.message);
        }
    }

    function render(data) {
        console.log(data.slip.advice)
        setAdvice(data.slip.advice)
        setAdviceId(data.slip.id)
    }

    const handleClick = () => {
        fetchAdvice().then(data => render(data));
    }


    useEffect(() => {
        const actWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', actWindowWidth);

        return () => {
            window.removeEventListener('resize', actWindowWidth)
        }
    }, [])


    return (
        <div className="bg-dark-grayish-blue mx-auto text-center w-c mt-c rounded-c pt-10 md:w-c1 md:mt-c1 md:rounded-c1 md:pt-c1">
            <p className="text-neon-green font-semibold text-t tracking-t mb-t pl-0.5 md:text-t1 md:tracking-t1 md:pl-t1 md:mb-t1" >ADVICE #{adviceId}</p>
            <p className="text-light-cyan font-semibold text-adv w-adv mx-auto tracking-adv leading-adv mb-adv md:w-adv1 md:text-adv1 md:font-bold md:tracking-adv1 md:leading-adv1 md:mb-adv1">"{advice}"</p>
            {windowWidth < 768 ? (
                <img className="mx-auto" src="./images/pattern-divider-mobile.svg" alt="pattern-divider"/>
            ) : (
                <img className="mx-auto md:mb-img" src="./images/pattern-divider-desktop.svg" alt="pattern-divider"/>
            )}
            <button onClick={handleClick} className="bg-neon-green p-5 r-btn rounded-full relative b-btn md:r-btn1 hover:shadow-btn"><img src="./images/icon-dice.svg" alt="advice button"/></button>
        </div>
    )
}