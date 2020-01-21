const _ = require("lodash");

const BeerScoreService = require("../services/beerScoreService");

class ActionBeerRecommendation {
  constructor(beerRepository) {
    this.beerRepository = beerRepository;
  }

  get actionName() {
    return 'getBeerRecommendation';
  }

  async handle({ kind, dish, bitterness, alcohol }) {
    const beers = await this.beerRepository.getAll();

    return (
      _.head(
        _.orderBy(
          beers,
          beer => {
            const scoreService = new BeerScoreService(beer);

            return [
              scoreService.kindScore(kind),
              scoreService.dishScore(dish),
              scoreService.bitternessScore(bitterness),
              scoreService.alcoholScore(alcohol)
            ].reduce((acc, val) => acc + val, 0);
          },
          "desc"
        )
      )
    );
  }
}

module.exports = ActionBeerRecommendation;
