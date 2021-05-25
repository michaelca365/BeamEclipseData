const fs = require('fs');

CalibrationelectronEnergy = {
    MevOpen6: 1.0430,
    MevOpen9: 0.9897,
    MevOpen12: 0.9634,
    MevOpen15: 0.9633,
    MevOpen18: 0.9131,
    MevSeis6: 1.0244,
    MevSeis9: 1.0645,
    MevSeis12: 1.0551,
    MevSeis15: 1.0828,
    MevSeis18: 1.0436,
    MevDiez6: 1.0623,
    MevDiez9: 1.0761,
    MevDiez12: 1.0641,
    MevDiez15: 1.0823,
    MevDiez18: 1.0326,
    MevQuincen6: 1.0567,
    MevQuincen9: 1.0659,
    MevQuincen12: 1.0497,
    MevQuincen15: 1.0608,
    MevQuincen18: 1.0057,
    MevVeinte6: 1.0699,
    MevVeinte9: 1.0531,
    MevVeinte12: 1.0339,
    MevVeinte15: 1.0421,
    MevVeinte18: 0.9861,
    MevVentiCinco6: 1.0669,
    MevVentiCinco9: 1.0307,
    MevVentiCinco12: 1.0050,
    MevVentiCinco15: 1.0102,
    MevVentiCinco18: 0.9567
}

calibrationFactor = {
    Mev6: 0.9392,
    Mev9: 0.9242,
    Mev12: 1.0060,
    Mev15: 0.9023,
    Mev18: 0.8948
}

class generateFiles {
    constructor(file){
        this.data = file;
    }

    splitFile(){
        //const data = this.data.split(/\r\n|\r|\n/);
        let data = this.data.split('22/05/2021');
        const arrayElement = new Array();
        data.shift();
        data.forEach( (element,index) => {
            const splitElements = element.split(/\r\n|\r|\n/);
            const dataConvert = this.dataTransform(splitElements);
            arrayElement[index] = {
                energy: splitElements[3].split(/\t/)[1],
                appl: splitElements[10].split(/\t/)[1],
                ssd: splitElements[8].split(/\t/)[1],
                pnts: dataConvert[1],
                data: dataConvert[0]
            }
            this.generateFiles( arrayElement[index], index );
        });
        
        return arrayElement;
    }
    dataTransform(data){
        const newArray = [];
        let z = 0;
        for(let i = 18; i<data.length; i++ ){
            if(data[i]){
                const arrayVector = data[i].split(/\t/);
                const solve = this.handlingNumber(arrayVector).join('   ');
                newArray[z] = solve;
                z++;
            }
            
        }
        return [newArray,(z-1)];
    }
    handlingNumber(number){
        let numberResult = number.map( (item, index)=>{
            item = parseFloat(item.replace(',', '.'));
            item = item / 100;
            if(index === 0){
                if( item >= 0 ){
                    item = `<+${item.toFixed(4)}`;
                }else{
                    item = `<-${item.toFixed(4)}`;
                }
            }else if(index === 1 || index === 2 ){
                if( item >= 0 ){
                    item = `+${item.toFixed(4)}`;
                }else{
                    item = `-${item.toFixed(4)}`;
                }
            }else if(index === 5){
                if( item >= 0 ){
                    item = `+${(item*100).toFixed(4)}>`;
                }else{
                    item = `${(item*100).toFixed(4)}>`;
                }
            }
            return item;
        });
        numberResult.splice(3, 1);
        numberResult.splice(3, 1);
        return numberResult;
    }
    returnCalibrationFactor(energy, fieldSize){ 
        if( energy == 6 && fieldSize == 6 ){
            return CalibrationelectronEnergy.MevSeis6 * calibrationFactor.Mev6;
        }else if( energy == 6 && fieldSize == 10 ){
            return CalibrationelectronEnergy.MevDiez6 * calibrationFactor.Mev6;
        }else if( energy == 6 && fieldSize == 15 ){
            return CalibrationelectronEnergy.MevQuincen6 * calibrationFactor.Mev6;
        }else if( energy == 6 && fieldSize == 20 ){
            return CalibrationelectronEnergy.MevVeinte6 * calibrationFactor.Mev6;
        }else if( energy == 6 && fieldSize == 25 ){
            return CalibrationelectronEnergy.MevVentiCinco6 * calibrationFactor.Mev6;
        }else if( energy == 9 && fieldSize == 6 ){
            return CalibrationelectronEnergy.MevSeis9 * calibrationFactor.Mev9;
        }else if( energy == 9 && fieldSize == 10 ){
            return CalibrationelectronEnergy.MevDiez9 * calibrationFactor.Mev9;
        }else if( energy == 9 && fieldSize == 15 ){
            return CalibrationelectronEnergy.MevQuincen9 * calibrationFactor.Mev9;
        }else if( energy == 9 && fieldSize == 20 ){
            return CalibrationelectronEnergy.MevVeinte9 * calibrationFactor.Mev9;
        }else if( energy == 9 && fieldSize == 25 ){
            return CalibrationelectronEnergy.MevVentiCinco9 * calibrationFactor.Mev9;
        }else if( energy == 12 && fieldSize == 6 ){
            return CalibrationelectronEnergy.MevSeis12 * calibrationFactor.Mev12;
        }else if( energy == 12 && fieldSize == 10 ){
            return CalibrationelectronEnergy.MevDiez12 * calibrationFactor.Mev12;
        }else if( energy == 12 && fieldSize == 15 ){
            return CalibrationelectronEnergy.MevQuincen12 * calibrationFactor.Mev12;
        }else if( energy == 12 && fieldSize == 20 ){
            return CalibrationelectronEnergy.MevVeinte12 * calibrationFactor.Mev12;
        }else if( energy == 12 && fieldSize == 25 ){
            return CalibrationelectronEnergy.MevVentiCinco12 * calibrationFactor.Mev12;
        }else if( energy == 15 && fieldSize == 6 ){
            return CalibrationelectronEnergy.MevSeis15 * calibrationFactor.Mev15;
        }else if( energy == 15 && fieldSize == 10 ){
            return CalibrationelectronEnergy.MevDiez15 * calibrationFactor.Mev15;
        }else if( energy == 15 && fieldSize == 15 ){
            return CalibrationelectronEnergy.MevQuincen15 * calibrationFactor.Mev15;
        }else if( energy == 15 && fieldSize == 20 ){
            return CalibrationelectronEnergy.MevVeinte15 * calibrationFactor.Mev15;
        }else if( energy == 15 && fieldSize == 25 ){
            return CalibrationelectronEnergy.MevVentiCinco15 * calibrationFactor.Mev15;
        }else if( energy == 18 && fieldSize == 6 ){
            return CalibrationelectronEnergy.MevSeis18 * calibrationFactor.Mev18;
        }else if( energy == 18 && fieldSize == 10 ){
            return CalibrationelectronEnergy.MevDiez18 * calibrationFactor.Mev18;
        }else if( energy == 18 && fieldSize == 15 ){
            return CalibrationelectronEnergy.MevQuincen18 * calibrationFactor.Mev18;
        }else if( energy == 18 && fieldSize == 20 ){
            return CalibrationelectronEnergy.MevVeinte18 * calibrationFactor.Mev18;
        }else if( energy == 18 && fieldSize == 25 ){
            return CalibrationelectronEnergy.MevVentiCinco18 * calibrationFactor.Mev18;
        }else if( energy == 6 && fieldSize == 40 ){
            return CalibrationelectronEnergy.MevOpen6 * calibrationFactor.Mev6;
        }else if( energy == 9 && fieldSize == 40 ){
            return CalibrationelectronEnergy.MevOpen9 * calibrationFactor.Mev9;
        }else if( energy == 12 && fieldSize == 40 ){
            return CalibrationelectronEnergy.MevOpen12 * calibrationFactor.Mev12;
        }else if( energy == 15 && fieldSize == 40 ){
            return CalibrationelectronEnergy.MevOpen15 * calibrationFactor.Mev15;
        }else if( energy == 18 && fieldSize == 40 ){
            return CalibrationelectronEnergy.MevOpen18 * calibrationFactor.Mev18;
        }else {
            return 1.0;
        }

    }
    returnAplicator(fieldSize){
        if(fieldSize == 110){
            return [`appl 6x6`, 6];
        }else if( fieldSize == 140 ){
            return [`appl 10x10;`, 10];
        }else if( fieldSize == 170 ){
            return [`appl 15x15`, 15];
        }else if( fieldSize == 230 ){
            return [`appl 20x20`, 20];
        }else if( fieldSize == 220 ){
            return [`appl 20x20`, 20];
        }else if( fieldSize == 250 ){
            return [`appl 20x20`, 20];
        }else if( fieldSize == 300 ){
            return [`appl 25x25`, 25];
        }else if( fieldSize == 280 ){
            return [`appl 25x25`, 25];
        }else if( fieldSize == 270 ){
            return [`appl 25x25`, 25];
        }else if( fieldSize == 400 ){
            return [`open`, 40 ];
        }else {
            return [`appl`, 50];
        }
    }
    generateFiles(dataFile, index){
        const energyFile = dataFile.energy.split(' '); 
        const fieldSize = parseInt(dataFile.appl.split(' '));
        const ssd = parseInt(dataFile.ssd.split(' ')) / 10;
        const measured = 'depth-dose';
        const step = 1.2;
        const axis = 'Z';
        const appl = this.returnAplicator(fieldSize);
        console.log(appl[1]);
        const calFactor = this.returnCalibrationFactor(energyFile[0], appl[1]);
        let typeMeasured = 'MeasuredDepthDosesForApplicator';
        if(fieldSize == 400){
            typeMeasured = 'MeasuredDepthDosesForOpenBeam'
        }
        const data =
        `$NUMS 1
$STOM
#${energyFile[0]}${energyFile[1] === 'MeV' ? 'e' : 'ph'} ${appl[0]} ${measured} ssd=${ssd}
%BMTY ${energyFile[1] === 'MeV' ? 'ELE' : 'photons'}
%FLSZ ${fieldSize.toFixed(1)}*${fieldSize.toFixed(1)} 
%CalibrationDepth ${this.calibrationDepth(energyFile[0])}
%CalibrationFactor ${calFactor.toFixed(3)}
%TYPE ${typeMeasured}
%DETY UNKNOWN
%STEP ${step}
%VERSION 02
%SPD ${ssd}
%PNTS ${dataFile.pnts}
%AXIS ${axis}
${dataFile.data.join("\n")}
$ENOM
$ENOF
        `;
        fs.writeFile(`./${energyFile[0]}${energyFile[1]}flsz${fieldSize.toFixed(1)}${index}.asc`, data, (err) => console.error(err) );
        //fs.writeFile(`./ejemplo.txt`, data, (err) => console.error(err) );
    }
    calibrationDepth(data){
        if(data == 6){
            return 1.3;
        }else if(data == 9){
            return 2.0;
        }else if(data == 12){
            return 2.9;
        }else if(data == 15){
            return 3.7;
        }else if(data == 18){
            return 4.4;
        }
    }
}

module.exports = {generateFiles};