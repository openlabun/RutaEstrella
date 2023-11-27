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
                    'background-color': "#2D5C7F",
                    label: "data(id)",
                },
            },
            {
                selector: "edge",
                style: {
                    width: 3,
                    'line-color': "#FF8F56",
                    'label': 'data(weight)',
					'curve-style': 'bezier',
					'target-arrow-shape': 'triangle', 
					'target-arrow-color': "#FF8F56",
					'arrow-scale': 1.5,
                },
            },
            {
                selector: "edge.shortest-path", // Define a CSS class for highlighting the path
                style: {
					width: undefined,
					height: undefined,
					'curve-style': 'bezier',
                    'line-color': "#2D5C7F", // Change the color to highlight the path
                    'target-arrow-color': "#2D5C7F", // Change the arrow color
                    'line-style': "dotted", // Change the line style
					'target-arrow-shape': 'triangle', 
					'arrow-scale': 1.5,
                },
            },

        ],
		
        userPanningEnabled: false, // Enable drag interaction
        userZoomingEnabled: false, // Enable zoom interaction
        layout: {
            name: "grid",
        },
    });
	
    const cyContainer = document.getElementById("cy-container");
    cyContainer.style.border = "1px solid black";
    cyContainer.style.position = "relative"; 
	
	const resizeObserver = new ResizeObserver(() => {
        cy.resize(); // Update Cytoscape instance on resize
    });

    resizeObserver.observe(cyContainer);
	
    // Enable node selection
    cy.nodes().unselectify();
	
	// Function to update the node dropdown menu
    function updateNodeDropdown(dropdownId, initialText) {
        const nodeDropdown = document.getElementById(dropdownId);

        // Clear existing options
        nodeDropdown.innerHTML = '<option value="" disabled selected>' + initialText + '</option>';

        // Add options for each node
        cy.nodes().forEach(node => {
            const nodeId = node.id();
            const option = document.createElement("option");
            option.value = nodeId;
            option.text = nodeId;
            nodeDropdown.add(option);
        });
    }

    // Update the node dropdown initially
    updateNodeDropdown("nodeDropdownDesde", "Seleccionar Nodo Desde");
	updateNodeDropdown("nodeDropdownHasta", "Seleccionar Nodo Hasta");
	
	
    // Creating a node
    document.getElementById("crearNodo").addEventListener("click", function () {
        const newNodeId = "N" + cy.nodes().length; // Generate a unique ID
        cy.add({
            group: "nodes", // Add the 'group' property
            data: { id: newNodeId },
            position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position
        });
		updateNodeDropdown("nodeDropdownDesde", "Seleccionar Nodo Desde");
		updateNodeDropdown("nodeDropdownHasta", "Seleccionar Nodo Hasta");
    });
	
	// Erasing a node
    document.getElementById("borrarN").addEventListener("click", function () {
        const selectedNodes = cy.$("node:selected");
		if (selectedNodes.length === 1) {
			const nodeIdToRemove = selectedNodes[0].id();
			cy.remove(cy.getElementById(nodeIdToRemove));
			updateNodeDropdown("nodeDropdownDesde");
			updateNodeDropdown("nodeDropdownHasta");
		}
		else{
			alert("Seleccione exactamente 1 nodo para borrar");
		}
    });

    // Creating an edge with a specified weight and direction
	document.getElementById("crearArista").addEventListener("click", function () {
		const sourceNodeId = document.getElementById("nodeDropdownDesde").value;
		const targetNodeId = document.getElementById("nodeDropdownHasta").value;
		const tipoArista = document.getElementById("tipoArista").value;
		const pesoArista = document.getElementById("pesoArista").value;

		if (!sourceNodeId || !targetNodeId || !tipoArista || pesoArista === "") {
			alert("Complete todos los campos para crear la arista");
			return;
		}

		// Ensure the source and target nodes are different
		if (sourceNodeId === targetNodeId) {
			alert("Seleccione nodos diferentes para crear una arista");
			return;
		}

		// Determine the arrow direction based on the selected tipoArista
		let arrowDirection;
		if (tipoArista === "izq") {
			arrowDirection = "triangle";
			// Add the edge to Cytoscape
			cy.add({
				group: "edges",
				data: {
					id: "e" + cy.edges().length, // Generate a unique ID
					source: targetNodeId,
					target: sourceNodeId,
					weight: pesoArista,
					label: pesoArista,
				},
				style: {
					'line-color': "#FF8F56",
					'target-arrow-color': "#FF8F56",
					'target-arrow-shape': arrowDirection,
				},
			});
		} 
		else if (tipoArista === "der") {
			arrowDirection = "triangle";
			// Add the edge to Cytoscape
			cy.add({
				group: "edges",
				data: {
					id: "e" + cy.edges().length, // Generate a unique ID
					source: sourceNodeId,
					target: targetNodeId,
					weight: pesoArista,
					label: pesoArista,
				},
				style: {
					'line-color': "#FF8F56",
					'target-arrow-color': "#FF8F56",
					'target-arrow-shape': arrowDirection,
				},
			});
		} 
		

		
	});
	
	// Erasing an edge
	document.getElementById("borrarA").addEventListener("click", function () {
		const selectedEdges = cy.$("edge:selected");

		if (selectedEdges.length === 1) {
			const edgeIdToRemove = selectedEdges[0].id();
			cy.remove(cy.getElementById(edgeIdToRemove));
		} else {
			alert("Seleccione exactamente 1 arista para borrar");
		}
	});

	// Selecting start
    var idInicial;
    document.getElementById("nodoInicial").addEventListener("click", function () {
            const selectedNodes = cy.$("node:selected");

            
            cy.$('node').style('background-color', '#2D5C7F');

            if (selectedNodes.length === 1) {
                selectedNodes.style('background-color', '#41644A');
                idInicial=selectedNodes.id();
                
            }
            
            if (selectedNodes.length === 0) {
                alert("Seleccione un nodo");
            }

    });
	
	// Selecting finish
    var idFinal;
    document.getElementById("nodoFinal").addEventListener("click", function () {
        const selectedNodes = cy.$("node:selected");
        

        if (selectedNodes.length === 1) {
            selectedNodes.style('background-color', '#9A4444');
            idFinal=selectedNodes.id();
        }
        if (selectedNodes.length === 0) {
            alert("Seleccione un nodo");
        }
	});

	//Finding A star
	document.getElementById("A*").addEventListener("click", function () {
		const aStar = cy.elements().aStar({
			root: "#" + idInicial,
			goal: "#" + idFinal,
			weight: function (edge) {
				
				return parseFloat(edge.data("weight")); // Get edge weight
			},
		});

		if (aStar.found) {
			// Highlight path found
			cy.$('edge.shortest-path').style({
				'line-color': "#FF8F56",
				'target-arrow-color': "#FF8F56",
				'line-style': "solid",
			});
			const path = aStar.path;
			path.addClass("shortest-path"); 

			path.style({
				'line-color': "#2D5C7F",
				'target-arrow-color': "#2D5C7F",
				'line-style': "dotted",
			});

			// Set timer
			setTimeout(() => {
				path.removeClass("shortest-path");
			}, 1000000); 
		} else {
			alert("No se encontró un camino entre los nodos seleccionados.");
		}
		

	});
	
	//Removing A star
	document.getElementById("quitarEstrella").addEventListener("click", function () {
		const path = cy.$('edge.shortest-path');
        path.removeClass("shortest-path");

        // Reset original styles for nodes and edges
        cy.$('node').style({
            'background-color': '#2D5C7F',
        });

        cy.$('edge').style({
            'line-color': '#FF8F56',
            'target-arrow-color': '#FF8F56',
            'line-style': 'solid',
        });
	});
});
