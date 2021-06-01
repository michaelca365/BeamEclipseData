const fs = require("fs");

CalibrationelectronEnergy = {
  MevOpen6: 0.99,
  MevOpen9: 0.931,
  MevOpen12: 0.901,
  MevOpen15: 0.886,
  MevOpen18: 1.0,
  MevSeis6: 0.967,
  MevSeis9: 0.995,
  MevSeis12: 0.973,
  MevSeis15: 0.989,
  MevSeis18: 1.0,
  MevDiez6: 1.009,
  MevDiez9: 1.01,
  MevDiez12: 0.987,
  MevDiez15: 0.993,
  MevDiez18: 1.0,
  MevQuincen6: 0.999,
  MevQuincen9: 0.996,
  MevQuincen12: 0.968,
  MevQuincen15: 0.952,
  MevQuincen18: 1.0,
  MevVeinte6: 1.011,
  MevVeinte9: 0.982,
  MevVeinte12: 0.953,
  MevVeinte15: 0.952,
  MevVeinte18: 1.0,
  MevVentiCinco6: 1.008,
  MevVentiCinco9: 0.96,
  MevVentiCinco12: 0.926,
  MevVentiCinco15: 0.92,
  MevVentiCinco18: 1.0,
};

calibrationFactor = {
  Mev6: 1,
  Mev9: 1,
  Mev12: 1,
  Mev15: 1,
  Mev18: 1,
};

class generateFiles {
  constructor(file) {
    this.data = file;
  }

  splitFile() {
    //const data = this.data.split(/\r\n|\r|\n/);
    let data = this.data.split("22/05/2021");
    const arrayElement = new Array();
    data.shift();
    data.forEach((element, index) => {
      const splitElements = element.split(/\r\n|\r|\n/);
      const dataConvert = this.dataTransform(splitElements);
      arrayElement[index] = {
        energy: splitElements[3].split(/\t/)[1],
        appl: splitElements[10].split(/\t/)[1],
        ssd: splitElements[8].split(/\t/)[1],
        spd: splitElements[9].split(/\t/)[1],
        pnts: dataConvert[1],
        scan: splitElements[13].split(/\t/)[1],
        data: dataConvert[0],
      };
      this.generateFiles( arrayElement[index], index );
    });

    return arrayElement;
  }
  dataTransform(data) {
    const newArray = [];
    let z = 0;
    for (let i = 18; i < data.length; i++) {
      if (data[i]) {
        const arrayVector = data[i].split(/\t/);
        const solve = this.handlingNumber(arrayVector).join("   ");
        newArray[z] = solve;
        z++;
      }
    }
    return [newArray, z - 1];
  }
  handlingNumber(number) {
    let numberResult = number.map((item, index) => {
      item = parseFloat(item.replace(",", "."));
      item = item / 100;
      if (index === 0) {
        if (item >= 0) {
          item = `<+${item.toFixed(4)}`;
        } else {
          item = `<${item.toFixed(4)}`;
        }
      } else if (index === 1 || index === 2) {
        if (item >= 0) {
          item = `+${item.toFixed(4)}`;
        } else {
          item = `${item.toFixed(4)}`;
        }
      } else if (index === 5) {
        if (item >= 0) {
          item = `+${(item * 100).toFixed(4)}>`;
        } else {
          item = `${(item * 100).toFixed(4)}>`;
        }
      }
      return item;
    });
    numberResult.splice(3, 1);
    numberResult.splice(3, 1);
    return numberResult;
  }
  returnCalibrationFactor(energy, fieldSize) {
    if (energy == 6 && fieldSize == 6) {
      return CalibrationelectronEnergy.MevSeis6 * calibrationFactor.Mev6;
    } else if (energy == 6 && fieldSize == 10) {
      return CalibrationelectronEnergy.MevDiez6 * calibrationFactor.Mev6;
    } else if (energy == 6 && fieldSize == 15) {
      return CalibrationelectronEnergy.MevQuincen6 * calibrationFactor.Mev6;
    } else if (energy == 6 && fieldSize == 20) {
      return CalibrationelectronEnergy.MevVeinte6 * calibrationFactor.Mev6;
    } else if (energy == 6 && fieldSize == 25) {
      return CalibrationelectronEnergy.MevVentiCinco6 * calibrationFactor.Mev6;
    } else if (energy == 9 && fieldSize == 6) {
      return CalibrationelectronEnergy.MevSeis9 * calibrationFactor.Mev9;
    } else if (energy == 9 && fieldSize == 10) {
      return CalibrationelectronEnergy.MevDiez9 * calibrationFactor.Mev9;
    } else if (energy == 9 && fieldSize == 15) {
      return CalibrationelectronEnergy.MevQuincen9 * calibrationFactor.Mev9;
    } else if (energy == 9 && fieldSize == 20) {
      return CalibrationelectronEnergy.MevVeinte9 * calibrationFactor.Mev9;
    } else if (energy == 9 && fieldSize == 25) {
      return CalibrationelectronEnergy.MevVentiCinco9 * calibrationFactor.Mev9;
    } else if (energy == 12 && fieldSize == 6) {
      return CalibrationelectronEnergy.MevSeis12 * calibrationFactor.Mev12;
    } else if (energy == 12 && fieldSize == 10) {
      return CalibrationelectronEnergy.MevDiez12 * calibrationFactor.Mev12;
    } else if (energy == 12 && fieldSize == 15) {
      return CalibrationelectronEnergy.MevQuincen12 * calibrationFactor.Mev12;
    } else if (energy == 12 && fieldSize == 20) {
      return CalibrationelectronEnergy.MevVeinte12 * calibrationFactor.Mev12;
    } else if (energy == 12 && fieldSize == 25) {
      return (
        CalibrationelectronEnergy.MevVentiCinco12 * calibrationFactor.Mev12
      );
    } else if (energy == 15 && fieldSize == 6) {
      return CalibrationelectronEnergy.MevSeis15 * calibrationFactor.Mev15;
    } else if (energy == 15 && fieldSize == 10) {
      return CalibrationelectronEnergy.MevDiez15 * calibrationFactor.Mev15;
    } else if (energy == 15 && fieldSize == 15) {
      return CalibrationelectronEnergy.MevQuincen15 * calibrationFactor.Mev15;
    } else if (energy == 15 && fieldSize == 20) {
      return CalibrationelectronEnergy.MevVeinte15 * calibrationFactor.Mev15;
    } else if (energy == 15 && fieldSize == 25) {
      return (
        CalibrationelectronEnergy.MevVentiCinco15 * calibrationFactor.Mev15
      );
    } else if (energy == 18 && fieldSize == 6) {
      return CalibrationelectronEnergy.MevSeis18 * calibrationFactor.Mev18;
    } else if (energy == 18 && fieldSize == 10) {
      return CalibrationelectronEnergy.MevDiez18 * calibrationFactor.Mev18;
    } else if (energy == 18 && fieldSize == 15) {
      return CalibrationelectronEnergy.MevQuincen18 * calibrationFactor.Mev18;
    } else if (energy == 18 && fieldSize == 20) {
      return CalibrationelectronEnergy.MevVeinte18 * calibrationFactor.Mev18;
    } else if (energy == 18 && fieldSize == 25) {
      return (
        CalibrationelectronEnergy.MevVentiCinco18 * calibrationFactor.Mev18
      );
    } else if (energy == 6 && fieldSize == 40) {
      return CalibrationelectronEnergy.MevOpen6 * calibrationFactor.Mev6;
    } else if (energy == 9 && fieldSize == 40) {
      return CalibrationelectronEnergy.MevOpen9 * calibrationFactor.Mev9;
    } else if (energy == 12 && fieldSize == 40) {
      return CalibrationelectronEnergy.MevOpen12 * calibrationFactor.Mev12;
    } else if (energy == 15 && fieldSize == 40) {
      return CalibrationelectronEnergy.MevOpen15 * calibrationFactor.Mev15;
    } else if (energy == 18 && fieldSize == 40) {
      return CalibrationelectronEnergy.MevOpen18 * calibrationFactor.Mev18;
    } else {
      return 1.0;
    }
  }
  returnAplicator(fieldSize) {
    if (fieldSize == 110) {
      return [`appl 6x6`, 6];
    } else if (fieldSize == 140) {
      return [`appl 10x10;`, 10];
    } else if (fieldSize == 170) {
      return [`appl 15x15`, 15];
    } else if (fieldSize == 230) {
      return [`appl 20x20`, 20];
    } else if (fieldSize == 220) {
      return [`appl 20x20`, 20];
    } else if (fieldSize == 250) {
      return [`appl 20x20`, 20];
    } else if (fieldSize == 300) {
      return [`appl 25x25`, 25];
    } else if (fieldSize == 280) {
      return [`appl 25x25`, 25];
    } else if (fieldSize == 270) {
      return [`appl 25x25`, 25];
    } else if (fieldSize == 400) {
      return [`open`, 40];
    } else {
      return [`appl`, 50];
    }
  }
  generateFiles(dataFile, index) {
    const energyFile = dataFile.energy.split(" ");
    const fieldSize = parseInt(dataFile.appl.split(" "));
    const ssd = parseInt(dataFile.ssd.split(" ")) / 10;
    const spd = parseInt(dataFile.spd.split(" ")) / 10;
    
    const step = 1.2;
    const axis = "Z";
    const kindMeasuere = "profiles";
    let data = '';
    if (kindMeasuere === "pdd") {
      const measured = "depth-dose";
      const appl = this.returnAplicator(fieldSize);
      const calFactor = this.returnCalibrationFactor(energyFile[0], appl[1]);
      let typeMeasured = "MeasuredDepthDosesForApplicator";
      if (fieldSize == 400) {
        typeMeasured = "MeasuredDepthDosesForOpenBeam";
      }
      data = `$NUMS 1
$STOM
#${energyFile[0]}${energyFile[1] === "MeV" ? "e" : "ph"} ${ appl[0]} ${measured} ssd=${ssd}
%BMTY ${energyFile[1] === "MeV" ? "ELE" : "photons"}
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
$ENOF`;
    }else if(kindMeasuere === "profiles"){
        const measured = 'profile';
        data = `$NUMS 1
$STOM
#${energyFile[0]}${energyFile[1] === "MeV" ? "e" : "ph"} open ${fieldSize/10}x${fieldSize/10} ${ dataFile.scan === 'Crossline' ? 'cp' : 'ip' } ${measured} in air
%BMTY ${energyFile[1] === "MeV" ? "ELE" : "photons"}
%FLSZ ${fieldSize.toFixed(1)}*${fieldSize.toFixed(1)} 
%SPD ${spd}
%PNTS ${dataFile.pnts}
%DETY UNKNOWN
%STEP ${step}
%VERSION 02
%TYPE MeasuredProfileForApplicator
%ID ${dataFile.scan}
%AXIS ${ dataFile.scan === 'Crossline' ? 'X': 'Y' }
${dataFile.data.join("\n")}
$ENOM
$ENOF`
    }
    fs.writeFile(`./${energyFile[0]}${energyFile[1]}flsz${fieldSize.toFixed(1)}${index}.asc`,data,(err) => console.error(err));
    //fs.writeFile(`./ejemplo.txt`, data, (err) => console.error(err) );
  }
  calibrationDepth(data) {
    if (data == 6) {
      return 1.3;
    } else if (data == 9) {
      return 2.0;
    } else if (data == 12) {
      return 2.9;
    } else if (data == 15) {
      return 3.7;
    } else if (data == 18) {
      return 4.4;
    }
  }
}

module.exports = { generateFiles };
