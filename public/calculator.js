let numActivity = 4;

//PERCENT
let gradeInputs = document.querySelectorAll('.grade');
// adding eventlistener to all inputs of the grade class
gradeInputs.forEach( element => { element.addEventListener('input', percent)});

function percent(e) {
	let percentage;

	if((e.currentTarget.parentNode.firstChild.value != 'Nan') && (e.currentTarget.parentNode.lastChild.value != 'Nan')) { 
		if((e.currentTarget.parentNode.firstChild.value == 0) || (e.currentTarget.parentNode.lastChild.value == 0) ) {
			percentage = 0;
		} else {
			percentage = ((e.currentTarget.parentNode.firstChild.value) / (e.currentTarget.parentNode.lastChild.value))*100;
		}	
	} else { return; }

	let t = 'percent' + e.target.id.charAt(e.target.id.length - 1);
	document.getElementById(t).innerHTML = roundToTwo(percentage) + '%';
}
	
function roundToTwo(num) {
	return +(Math.round(num + "e+2")  + "e-2");
}

// ADD ROW/ACTIVITY
let addBtn = document.getElementById("add");
let table = document.getElementById("table");

addBtn.addEventListener('click', () => {
	numActivity += 1;
	
	//insert new row
	let newRow = table.insertRow(numActivity);
	newRow.setAttribute('class', 'activities');

	//insert Name Cell
	let cell0 = newRow.insertCell(0);
	let text = 'Activity ' + numActivity;
	let text0 = document.createTextNode(text);
	cell0.appendChild(text0);

	//insert short name cell
	let cell1 = newRow.insertCell(1);
	text = 'A' + numActivity;
	let text1 = document.createTextNode(text);
	cell1.appendChild(text1);

	//insert weight cell
	let cell2 = newRow.insertCell(2);
	let input = document.createElement("input");
	input.setAttribute('type', 'number');
	let t = 'weight'+numActivity;
	input.setAttribute('id', t)
	cell2.appendChild(input);

	//insert grade cell
	let cell3 = newRow.insertCell(3);
	//insert first input 
	let input1 = document.createElement("input");
	input1.setAttribute('type', 'number');
	input1.setAttribute('class', 'grade');
	t = 'num'+numActivity;
	input1.setAttribute('id', t)
	input1.addEventListener('input', percent)   //add onclick event listner
	//insert text
	cell3.appendChild(input1);
	let text3 = document.createTextNode(' / ');
	cell3.appendChild(text3);
	//insert second input
	let input2 = document.createElement("input");
	input2.setAttribute('type', 'number');
	input2.setAttribute('class', 'grade');
	t = 'denum'+numActivity;
	input2.setAttribute('id', t)
	input2.addEventListener('input', percent)   //add onclick event listner
	cell3.appendChild(input2);

	//insert percent cell
	let cell4 = newRow.insertCell(4);
	let output = document.createElement('div');
	output.setAttribute('id', 'percent' + numActivity);
	cell4.appendChild(output);
	
});

//CALCULATE AVERAGE OF WEIGHTED GRADES
document.getElementById("weighted").onclick = () => weightedAverage();

function weightedAverage() {
	let weightedAv = 0;
	let weights = 0;
	let rows = 0;
	let activities = document.querySelectorAll('.activities'); 

	activities.forEach( element => {
		rows += 1;
		let weight = 0;

		// getting the weight and grade
		let idWeight = 'weight' + rows;
		let id = 'percent' + rows;
		let grade = parseFloat(document.getElementById(id).textContent);

		if(!isNaN(document.getElementById(idWeight).valueAsNumber) && !isNaN(grade)){
			weight = document.getElementById(idWeight).valueAsNumber;
			weights += weight;
			weightedAv += ((grade/100) * weight);
		}

	});

	weightedAv /= weights;
	weightedAv *= 100;
 	document.getElementById('mark').innerHTML = roundToTwo(weightedAv) + '%';
}

//CALCULATE AVERAGE OF GRADES
document.getElementById("average").onclick = () => mean();

function mean() {
	let average = 0;
	let i = 0;
	let rows = 0;
	let activities = document.querySelectorAll('.activities'); 

	// selecting each row one at a time
	activities.forEach( element => {
		rows += 1;
		//getting the grade
		let id = 'percent' + rows ;
		let grade = parseFloat(document.getElementById(id).textContent);
		console.log(grade);
		if(!isNaN(grade)){
			i += 1;
			average += (grade/100);
		}
		console.log(average);
	});

	average /= i;
	average *= 100;
	console.log(average);
	document.getElementById('mark').innerHTML = roundToTwo(average) + '%';
}