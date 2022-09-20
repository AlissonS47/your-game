import "./MetaCritic.css"

const MetaCritic = ({gameScore}) => {

  const metaCriticScore = (score) => {
    if(score >= 75 && score <= 100) return "metacritic--good"
    else if(score >= 50 && score <= 74) return "metacritic--regular"
    else return "metacritic--bad"
  }

  return (
    <p className={`metacritic ${metaCriticScore(gameScore)}`}>{gameScore}</p>
  )
}

export default MetaCritic