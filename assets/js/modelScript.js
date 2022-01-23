var dep_data = []
var anx_data = []
var str_data = []

async function split_data(){
    dep_data = await tf.tensor2d([questionlist[2], questionlist[4], questionlist[9], questionlist[12], questionlist[15], questionlist[16], questionlist[20], 
                  questionlist[23], questionlist[25], questionlist[30], questionlist[33], questionlist[36], questionlist[37], questionlist[41]], [1, 14])
    anx_data = await tf.tensor2d([questionlist[1], questionlist[3], questionlist[6], questionlist[8], questionlist[14], questionlist[18], questionlist[19], 
                  questionlist[22], questionlist[24], questionlist[27], questionlist[29], questionlist[35], questionlist[39], questionlist[40]], [1, 14])
    str_data = await tf.tensor2d([questionlist[0], questionlist[5], questionlist[7], questionlist[10], questionlist[11], questionlist[13], questionlist[17], 
                  questionlist[21], questionlist[26], questionlist[28], questionlist[31], questionlist[32], questionlist[34], questionlist[39]], [1, 14])
    
}

async function predict(){

    document.getElementById("results").style.display = "block";
    const dep_model = await tf.loadLayersModel('assets/models/dep_model/dep_model.json');
    const anx_model = await tf.loadLayersModel('assets/models/anx_model/anx_model.json');
    const str_model = await tf.loadLayersModel('assets/models/str_model/str_model.json');

    await split_data()
    const prediction_dep = dep_model.predict(dep_data).arraySync()[0];
    const prediction_anx = anx_model.predict(anx_data).arraySync()[0];
    const prediction_str = str_model.predict(str_data).arraySync()[0];

    
    

    const prediction_dep_final = finalPred(prediction_dep)
    const prediction_anx_final = finalPred(prediction_anx)
    const prediction_str_final = finalPred(prediction_str)
    
    displayHtml(prediction_dep_final, "depression")
    displayHtml(prediction_anx_final, "anxiety")
    displayHtml(prediction_str_final, "stress")

    
}

function finalPred(prediction){
    let newPred = []
    for(var pred of prediction){
        if(pred > 0.5){
            newPred.push(1)
        } else {
            newPred.push(0)
        }
    }

    return newPred
}

function displayHtml(prediction, type){
    for(let i = 0; i < prediction.length; i++){
        if(prediction[i] === 1){
            if(i === 0){
                document.getElementById(type).innerHTML = "Your " + type + " is extremely severe! We advise you to get help immediately!" 
            } else if(i === 1){ 
                document.getElementById(type).innerHTML = "Your " + type + " is mild. We advise you to check out the tools we provided at the starting screen " + type
            } else if(i === 2){
                document.getElementById(type).innerHTML = "Your " + type + " is moderate. We advise you to check out the tools we provided at the starting screen " + type
            } else if(i === 3){
                document.getElementById(type).innerHTML = "Your " + type + " is normal or not existing. We still advise you to check out the tools incase of a " + type + "response to events in your life"
            } else {
                document.getElementById(type).innerHTML = "Your " + type + " is severe! We advise you to get professional help with your " + type
            }
        }
    }
}
predict()

// prediction_classes = []
// for pred in predictions:
//     single_pred = [
//         1 if prob > 0.5 else 0 for prob in np.ravel(pred)
//     ]
//     prediction_classes.append(single_pred)