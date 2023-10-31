document.addEventListener("DOMContentLoaded", function () {
    // Initialize Cytoscape
    const cy = cytoscape({
        container: document.getElementById("cy-container"),
        elements: [], // Start with no elements
        style: [
            {
                selector: "node",
                style: {
                    width: 20,
                    height: 20,
                    'background-color': "blue",
                    label: "data(id)",
                },
            },
            {
                selector: "edge",
                style: {
                    width: 2,
                    'line-color': "gray",
                    'label': 'data(weight)' // Show the weight as a label
                },
            },
            {
                selector: ".shortest-path", // Define a CSS class for highlighting the path
                style: {
                    'line-color': "red", // Change the color to highlight the path
                    'target-arrow-color': "red", // Change the arrow color
                    'line-style': "dotted", // Change the line style
                },
            },
        ],
        userPanningEnabled: false, // Enable drag interaction
        userZoomingEnabled: false, // Enable zoom interaction
        layout: {
            name: "grid",
        },
    });
    
    // Enable node selection
    cy.nodes().unselectify();

    // Handle creating a node
    document.getElementById("crearNodo").addEventListener("click", function () {
        const newNodeId = "N" + cy.nodes().length; // Generate a unique ID
        cy.add({
            group: "nodes", // Add the 'group' property
            data: { id: newNodeId },
            position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position
        });
    });

    // Handle creating an edge with a specified weight
    document.getElementById("crearArista").addEventListener("click", function () {
        const selectedNodes = cy.$("node:selected");
        if (selectedNodes.length === 2) {
            const pesoArista = document.getElementById("pesoArista").value;
            if (pesoArista === "") {
                alert("Ingresa un peso para la arista.");
                return;
            }

            // Ensure exactly 2 nodes are selected
            cy.add({
                group: "edges",
                data: {
                    id: "e" + cy.edges().length, // Generate a unique ID
                    source: selectedNodes[0].id(),
                    target: selectedNodes[1].id(),
                    weight: pesoArista, // Add the 'weight' property
                    label: pesoArista // Set the label to the weight
                },
            });
        } else {
            alert("Select exactly 2 nodes to create an edge.");
        }
    });
    var idInicial;
    document.getElementById("nodoInicial").addEventListener("click", function () {
            const selectedNodes = cy.$("node:selected");

            
            cy.$('node').style('background-color', 'blue');

            if (selectedNodes.length === 1) {
                selectedNodes.style('background-color', 'green');
                idInicial=selectedNodes.id();
                
            }
            
            if (selectedNodes.length === 0) {
                alert("Seleccione un nodo");
            }

    });
    var idFinal;
    document.getElementById("nodoFinal").addEventListener("click", function () {
        const selectedNodes = cy.$("node:selected");
        

        if (selectedNodes.length === 1) {
            selectedNodes.style('background-color', 'red');
            idFinal=selectedNodes.id();
        }
        if (selectedNodes.length === 0) {
            alert("Seleccione un nodo");
        }








});

document.getElementById("A*").addEventListener("click", function () {
    const aStar = cy.elements().aStar({
        root: "#" + idInicial,
        goal: "#" + idFinal,
        weight: function (edge) {
            return parseFloat(edge.data("weight")); // Obtén el peso de la arista del atributo "weight"
        },
    });

    if (aStar.found) {
        // Resaltar el camino encontrado
        const path = aStar.path;
        path.addClass("shortest-path"); // Aplica la clase CSS para resaltar el camino

        // Puedes desactivar la clase de resaltado después de un tiempo para quitar el resaltado
        setTimeout(() => {
            path.removeClass("shortest-path");
        }, 1000000); // Quitar el resaltado después de 3 segundos (ajusta el tiempo según tu preferencia)
    } else {
        alert("No se encontró un camino entre los nodos seleccionados.");
    }
    

});


});
