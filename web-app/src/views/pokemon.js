import React from 'react';
import Grid from '@material-ui/core/Grid';
import { MainLayout } from '../layouts/main';
import { PokemonSummary } from '../components/pokemon-summary';
import { PokemonMoves } from '../components/pokemon-moves';
import { PokemonStats } from '../components/pokemon-stats';
import { PokemonOtInfo } from '../components/pokemon-ot-info';
import { PokemonOrigin } from '../components/pokemon-origin';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMON_DETAILS } from '../graphql/queries/pokemon-details';

export const PokemonView = ({ match }) => {
  const { userId, collectionId, pokemonId } = match.params;
  const { data, loading } = useQuery(GET_POKEMON_DETAILS, {
    variables: { userId, collectionId, pokemonId },
  });
  const {
    species,
    ability,
    statNature,
    EV_HP,
    EV_ATK,
    EV_DEF,
    EV_SPE,
    EV_SPA,
    EV_SPD,
    move1,
    move2,
    move3,
    move4,
    IV_HP,
    IV_ATK,
    IV_DEF,
    IV_SPE,
    IV_SPA,
    IV_SPD,
    version,
    language,
    otName,
    eggYear = 2020,
    eggMonth = 0,
    eggDay = 0,
    metYear = 2020,
    metMonth = 0,
    metDay = 0,
    ball,
    displayTID,
    displaySID,
  } = data?.user?.collection?.pokemon || {};
  const ivs = [IV_HP, IV_ATK, IV_DEF, IV_SPA, IV_SPD, IV_SPE];
  const evs = [EV_HP, EV_ATK, EV_DEF, EV_SPA, EV_SPD, EV_SPE];
  const moves = [move1, move2, move3, move4];

  return (
    <MainLayout loading={loading}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <PokemonSummary
            ability={ability}
            ball={ball}
            ivs={ivs}
            nature={statNature}
            species={species}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <PokemonOtInfo otName={otName} tid={displayTID} sid={displaySID} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <PokemonOrigin
            metYear={2000 + metYear}
            metMonth={metMonth}
            metDay={metDay}
            eggMetYear={2000 + eggYear}
            eggMetMonth={eggMonth}
            eggMetDay={eggDay}
            language={language}
            version={version}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <PokemonMoves moves={moves} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <PokemonStats ivs={ivs} evs={evs} />
        </Grid>
      </Grid>
    </MainLayout>
  );
};
