

d3.json("samples.json").then(json => {
    select = d3.select("#selDataset");
    let names = json.names;
    names.forEach(idnum => {
        select.append("option").text(idnum).property("value", idnum);
    }); 
});

optionChanged(940);

function optionChanged(idnum) {
    d3.json("samples.json").then(json => {
        meta = json.metadata
        console.log
        for (var i = 0; i < meta.length; i++) {
            if (meta[i].id == idnum) {
                var data = meta[i];
                console.log(data);
                break;
            }
        }
        var panel = d3.select("#sample-metadata");
        panel.html("");
        for (var property in data) {
            panel.append("b").text(`${property} : ${data[property]}`).append('br')
        }
        samples = json.samples
        for (var i = 0; i < samples.length; i++) {
            if (samples[i].id == idnum) {
                var data = samples[i];
                console.log(data);
                break;
            }
        }
        bardata = [{
            x : data.sample_values.slice(0,10).reverse(),
            y : data.otu_ids.map(id => `OTU ${id}`).slice(0,10).reverse(),
            orientation: "h",
            text: data.otu_labels.slice(0,10).reverse(),
            type : "bar"
        }]

        barlayout = {
        }
        Plotly.newPlot('bar', bardata, barlayout);

        var bubbledata = [{
            x: data.otu_ids,
            y: data.sample_values,
            mode: 'markers',
            text: data.otu_labels,
            marker: {
                size: data.sample_values,
                color: data.otu_ids,
                colorscale: "Electric"
            }
        }];

        bubblelayout = {
            xaxis: {title: "OTU ID"}
        }
        Plotly.newPlot('bubble', bubbledata, bubblelayout);
    })

}