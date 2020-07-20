async function getTeams(year, k) {
    try {
        let page = 1;
        let api = `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${page}`;
        let teamsPlayed = []; 
        let response = await fetch(api);
        const { total_pages } = await response.json(); 
        for(let i = 1; i <= total_pages; i++){
            page = i;
            api = `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${page}`;
            response = await fetch(api);
            /// [data] = response from [api] with the [page].
            let { data } = await response.json();
            // For each play in [data] (Plays of the year on [page]).
            for(let juego of data){
                // Save the name of the teams on [teamsPlayed].
                teamsPlayed.push(juego.team1);
                teamsPlayed.push(juego.team2);
            }
        }
        let contados = {}; // [teamName] : [Number of duplicated values of [teamName] in [teamsPLayed]].
        teamsPlayed.forEach((x) => { 
            contados[x] = (contados[x] || 0)+1; 
        });
        let finalTeams = []; // [finalTeams] = the minimum(k) times that the [teamName] needs to be in [finalTeams].
        for(let team in contados){
            if(contados[team] >= k){
                console.log(team, 'Played on ', year, contados[team], ' Times');
                finalTeams.push(team);
            }else{
                continue;
            }
        }
        console.warn('Results: ',{finalTeams});
        return finalTeams;
        
    } catch (err) {
        return err;
    }
}

getTeams(2015, 5);