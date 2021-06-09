//javascript


var svg = d3.select("svg")
    .attr("width", 1700)
    .attr("height", 1100)
    .attr("class", "svg-container");

    svg.append('line')
    .style("stroke", "white")
    .style("stroke-width", 5)
    .attr("x1", 1500)
    .attr("y1", 0)
    .attr("x2", 1500)
    .attr("y2", 1100); 
    
var scala_lunghezza
var scala_ruote
var scala_alettone_ant
var scala_alettone_pos


var positions = []
positions[0] = {"x": 50, "y": 50}
positions[1] = {"x": 50, "y": 150}
positions[2] = {"x": 50, "y": 250}
positions[3] = {"x": 50, "y": 350}
positions[4] = {"x": 50, "y": 450}
positions[5] = {"x": 50, "y": 550}
positions[6] = {"x": 50, "y": 650}
positions[7] = {"x": 50, "y": 750}
positions[8] = {"x": 50, "y": 850}
positions[9] = {"x": 50, "y": 950}


var colours = []
colours[0] = "red"
colours[1] = "blue"
colours[2] = "yellow"
colours[3] = "cyan"
colours[4] = "green"
colours[5] = "orange"
colours[6] = "white"
colours[7] = "pink"
colours[8] = "purple"
colours[9] = "brown"


//disegna l'auto
function drawCar(data, i){

    //veicolo, la lunghezza del veicolo è variabile mentre la larghezza è costante per tutte le auto a 40 pixel
    svg.append("rect")
    .attr("class","veicolo"+i)
    .attr("x", positions[i].x)
    .attr("y", positions[i].y)
    .attr("width", data.lunghezza)
    .attr("height", 40)
    .attr("fill", colours[i])
    .on("click", function () {go("veicolo")});
    
    //per dim_ruote si intende la larghezza, lo spessore invece è costante per tutte a 10 pixel per tutte le automobili
    // ruota in alto a sx
    svg.append("rect")
    .attr("class","ra_sx"+i)
    .attr("x", positions[i].x)
    .attr("y", positions[i].y-10)
    .attr("width", data.dim_ruote)
    .attr("height", 10)
    .attr("fill", "black")
    .on("click", function () {go("ra_sx")});

    //ruota in alto a dx
    svg.append("rect")
    .attr("class","ra_dx"+i)
    .attr("x", positions[i].x + data.lunghezza - data.dim_ruote)
    .attr("y", positions[i].y-10)
    .attr("width", data.dim_ruote)
    .attr("height", 10)
    .attr("fill", "black")
    .on("click", function () {go("ra_dx")});

    //ruota in basso a sx
    svg.append("rect")
    .attr("class","rb_sx"+i)
    .attr("x", positions[i].x)
    .attr("y", positions[i].y + 40)
    .attr("width", data.dim_ruote)
    .attr("height", 10)
    .attr("fill", "black")
    .on("click", function () {go("rb_sx")});

    //ruota in basso a dx
    svg.append("rect")
    .attr("class","rb_dx"+i)
    .attr("x", positions[i].x + data.lunghezza - data.dim_ruote)
    .attr("y", positions[i].y + 40)
    .attr("width", data.dim_ruote)
    .attr("height", 10)
    .attr("fill", "black")
    .on("click", function () {go("rb_dx")});

    //alettone posteriore (per dim_alettone_pos si intende la larghezza, lo spessore è costante a 20 pixel per tutte le automobili)
    svg.append("rect")
    .attr("class","alettone_pos"+i)
    .attr("x", positions[i].x-21)
    .attr("y", (positions[i].y + (40/2))-(data.dim_alettone_pos/2) )
    .attr("width", 20)
    .attr("height", data.dim_alettone_pos)
    .attr("fill", colours[i])
    .on("click", function () {go("alettone_pos")});

    //alettone (per dim_alettone_pos si intende la larghezza, lo spessore è costante a 10 pixel per tutte le automobili)
    svg.append("rect")
    .attr("class","alettone_ant"+i)
    .attr("x", positions[i].x + data.lunghezza + 1)
    .attr("y", (positions[i].y + (40/2))-(data.dim_alettone_ant/2) )
    .attr("width", 10)
    .attr("height", data.dim_alettone_ant)
    .attr("fill", colours[i])
    .on("click", function () {go("alettone_ant")});

}


function go(elemento){

    //se le auto hanno già corso ricarico i dati
    if(d3.select(".veicolo"+1).attr("x") != 50){

        location.reload();
    } else {
        for (i=0; i<10; i++){

            //salvo le x di tutte le rect che compongono l'automobile i-esima
            x1 = d3.select(".veicolo"+i).attr("x")
            x2 = d3.select(".ra_sx"+i).attr("x")
            x3 = d3.select(".ra_dx"+i).attr("x")
            x4 = d3.select(".rb_sx"+i).attr("x")
            x5 = d3.select(".rb_dx"+i).attr("x")
            x6 = d3.select(".alettone_pos"+i).attr("x")
            x7 = d3.select(".alettone_ant"+i).attr("x")

            //controllo sull'elemento cliccato: nel primo if prendo la larghezza della rect, nel secondo l'altezza 
            //motivazione esplicitata nell'implementazione delle varie rect 
            if (elemento == "veicolo" || elemento == "ra_sx" || elemento =="ra_dx" || elemento =="rb_sx" || elemento =="rb_dx") {
                spostamento = d3.select("."+elemento+i).attr("width")
            }
                
            if (elemento == "alettone_pos" || elemento == "alettone_ant") {
                spostamento = d3.select("."+elemento+i).attr("height")
            }
            

            //scalo in base all'elemento cliccato 
            //in base al veicolo
            if (elemento == "veicolo") {
                spostamento = scala_lunghezza(spostamento)
            }
            //in base alla dimensione delle ruote
            if (elemento == "ra_sx" || elemento =="ra_dx" || elemento =="rb_sx" || elemento =="rb_dx")  {
                spostamento = scala_ruote(spostamento)
            }
            //in base all'alettone posteriore
            if (elemento == "alettone_pos") {
                spostamento = scala_alettone_pos(spostamento)
            }
            //in base all'alettone anteriore
            if (elemento == "alettone_ant") {
                spostamento = scala_alettone_ant(spostamento)
            }


            //traslo tutte le rect del valore spostamento, calcolato per ciascuna auto in base al proprio valore della componente cliccata
            d3.select(".veicolo"+i).transition().duration(1000).attr('x', +x1 + +spostamento)
            d3.select(".ra_sx"+i).transition().duration(1000).attr('x', +x2 + +spostamento)
            d3.select(".ra_dx"+i).transition().duration(1000).attr('x', +x3 + +spostamento)
            d3.select(".rb_sx"+i).transition().duration(1000).attr('x', +x4 + +spostamento)
            d3.select(".rb_dx"+i).transition().duration(1000).attr('x', +x5 + +spostamento)
            d3.select(".alettone_pos"+i).transition().duration(1000).attr('x', +x6 + +spostamento)
            d3.select(".alettone_ant"+i).transition().duration(1000).attr('x', +x7 + +spostamento);
            
        }
    }

}


d3.json("cars.json")
    .then(function(data){
        dataset = data

        scala_lunghezza = d3.scaleLinear();
        scala_lunghezza.domain([0, d3.max(data, function(d) { return d.lunghezza; })]); 
        scala_lunghezza.range([50, 1500]) //scalo su 1500 in modo tale da non far uscire le auto, superando comunque la linea di arrivo

        scala_ruote = d3.scaleLinear();
        scala_ruote.domain([0, d3.max(data, function(d) { return d.dim_ruote; })]); 
        scala_ruote.range([50, 1500])

        scala_alettone_ant = d3.scaleLinear();
        scala_alettone_ant.domain([0, d3.max(data, function(d) { return d.dim_alettone_ant; })]); 
        scala_alettone_ant.range([50, 1500])

        scala_alettone_pos = d3.scaleLinear();
        scala_alettone_pos.domain([0, d3.max(data, function(d) { return d.dim_alettone_pos; })]); 
        scala_alettone_pos.range([50, 1500])

        var i=0;
        for (d in data) {
            if(i<10){
                drawCar(data[d], i);
                i++;
            }
        }
    });
