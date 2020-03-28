/**
 * Returns a range of parts to use for best durability by given weight and part limit.
 *
 * @param {range} list Range of the parts. First row are properties. Required properties are: limit, durability, mass. You can also use custom properties, e.g.: id, name, faction, part, prestiege
 * @param {number} partLimit Maximum number of parts to use.
 * @param {number} massLimit Maximum mass used by all parts together.
 * @param {number} psLimit Maximum power score of all parts together.
 * @param {range} props Properties to show in the result. Available properties are: amount, durability, mass, dm (durability per mass), durabilityTotal, massTotal and your custom properties.
 * @param {range} cond Range of property conditions to evaluate one at a time. e.g: {"mass < 75"; "faction == 'Lunatics'"}
 * @param {range} filter Range of filtering conditions to apply to the result. e.g: "amount > 0"
 * @param {range} order Range of orders of the result. Must have 2 columns where the first column is the property and the second column denoting if the order should be descending. For descending: TRUE, 'desc', 'descending', and for ascending: blank cell, FALSE, 'asc' or 'ascending'.
 * @customfunction
 * @author LetMehHealPl0x
 */
function XODURABILITY(range, partLimit, massLimit, psLimit, props, cond, filter, order) {
  var debug = false;
  
  var debugParams = function () {
    range = JSON.parse('[["id","name","part","faction","durability","mass","ps","prestige","limit"],[1,"APC door","APC","Steppenwolfs",53,157,31,false,4],[2,"APC rear","APC","Steppenwolfs",105,314,62,false,2],[3,"APC roof part","APC","Steppenwolfs",120,359,70,false,6],[4,"APC side part","APC","Steppenwolfs",61,180,35,false,6],[5,"Armored hatch","APC","Steppenwolfs",98,293,58,false,2],[6,"Hard module","APC","Steppenwolfs",94,280,55,false,4],[7,"Small APC roof part","APC","Steppenwolfs",23,68,13,false,9],[8,"Small tank side part","APC","Steppenwolfs",23,68,13,false,6],[9,"Strengthened slope","APC","Steppenwolfs",49,146,29,false,6],[10,"Strengthened twin slope","APC","Steppenwolfs",12,34,7,false,4],[11,"Strengthened ventilated slope","APC","Steppenwolfs",23,68,13,false,6],[12,"Tank side part","APC","Steppenwolfs",46,135,26,false,8],[13,"Thin strike plate","APC","Steppenwolfs",8,23,4,false,6],[14,"Brazier","Buggy","Lunatics",14,27,18,false,6],[15,"Buggy fender left","Buggy","Lunatics",6,11,7,false,3],[16,"Buggy fender right","Buggy","Lunatics",6,11,7,false,3],[17,"Buggy rear","Buggy","Lunatics",44,86,56,false,6],[18,"Buggy step plate","Buggy","Lunatics",8,14,9,false,10],[19,"Comb","Buggy","Lunatics",4,7,4,false,10],[20,"Dipper","Buggy","Lunatics",14,27,18,false,4],[21,"Dryer","Buggy","Lunatics",10,19,12,false,6],[22,"Fryer","Buggy","Lunatics",28,54,35,false,6],[23,"Grater","Buggy","Lunatics",6,11,7,false,8],[24,"Left crutch","Buggy","Lunatics",10,19,12,false,8],[25,"Right crutch","Buggy","Lunatics",10,19,12,false,8],[26,"Whaleback","Buggy","Lunatics",41,80,52,false,9],[27,"Bully nosecut","Bully","Lunatics",14,27,18,true,0],[28,"Left shielded fender","Bully","Lunatics",7,12,8,true,0],[29,"Powerslide","Bully","Lunatics",68,135,88,true,0],[30,"Right shielded fender","Bully","Lunatics",7,12,8,true,0],[31,"Side guard left","Bully","Lunatics",11,21,13,true,0],[32,"Side guard right","Bully","Lunatics",11,21,13,true,0],[33,"Barrel quarter","Container","Scavengers",12,32,7,false,8],[34,"Container wall","Container","Scavengers",114,323,70,false,2],[35,"Half-wall","Container","Scavengers",57,162,35,false,6],[36,"Large fender","Container","Scavengers",93,263,57,false,6],[37,"Large slope","Container","Scavengers",36,101,22,false,8],[38,"Metal box","Container","Scavengers",15,41,9,false,4],[39,"Quarter wall","Container","Scavengers",29,81,18,false,8],[40,"Truck door","Container","Scavengers",114,323,70,false,4],[41,"Truck slope","Container","Scavengers",11,32,7,false,10],[42,"Twin slope","Container","Scavengers",22,61,13,false,6],[43,"Wide slope","Container","Scavengers",22,61,13,false,4],[44,"Corrida left fender","Corrida","Nomads",56,142,40,true,0],[45,"Corrida nosecut","Corrida","Nomads",68,173,48,true,0],[46,"Corrida right fender","Corrida","Nomads",56,142,40,true,0],[47,"Left shoulder","Corrida","Nomads",7,16,4,true,0],[48,"Left side air intake","Corrida","Nomads",20,48,15,true,0],[49,"Right shoulder","Corrida","Nomads",7,16,4,true,0],[50,"Right side air intake","Corrida","Nomads",20,48,15,true,0],[51,"Finale","Death","Firestarters",56,135,44,true,0],[52,"Left Death fender","Death","Firestarters",19,48,13,true,0],[53,"Right Death fender","Death","Firestarters",19,48,13,true,0],[54,"Left phalanx","Famine","Dawns Children",13,24,15,true,0],[55,"Left rib","Famine","Dawns Children",19,37,24,true,0],[56,"Right phalanx","Famine","Dawns Children",13,24,15,true,0],[57,"Right rib","Famine","Dawns Children",19,37,24,true,0],[58,"Rump","Famine","Dawns Children",25,48,31,true,0],[59,"Boar","Hot Rod","Firestarters",45,95,46,false,4],[60,"Cover your left","Hot Rod","Firestarters",15,32,15,false,4],[61,"Cover your right","Hot Rod","Firestarters",15,32,15,false,4],[62,"Devilry","Hot Rod","Firestarters",30,63,31,false,4],[63,"Downstream","Hot Rod","Firestarters",22,45,22,false,10],[64,"Flaming rakes","Hot Rod","Firestarters",22,45,22,false,6],[65,"Left thorn","Hot Rod","Firestarters",13,27,13,false,4],[66,"Peaky blinder","Hot Rod","Firestarters",17,36,18,false,6],[67,"Right thorn","Hot Rod","Firestarters",13,27,13,false,4],[68,"Rollover","Hot Rod","Firestarters",28,59,29,false,8],[69,"Scorched","Hot Rod","Firestarters",47,99,48,false,6],[70,"Air intake","Mars rover","Dawns Children",4,8,2,false,10],[71,"Broken radiator","Mars rover","Dawns Children",19,48,13,false,8],[72,"Control module","Mars rover","Dawns Children",28,71,20,false,10],[73,"Cooling system","Mars rover","Dawns Children",62,157,44,false,8],[74,"Hull back","Mars rover","Dawns Children",53,134,37,false,6],[75,"Hull part","Mars rover","Dawns Children",10,24,7,false,8],[76,"Observation pod","Mars rover","Dawns Children",31,79,22,false,6],[77,"Ventilation box","Mars rover","Dawns Children",28,71,20,false,6],[78,"Bandage","Pestilence","Firestarters",26,54,26,true,0],[79,"Left catheter","Pestilence","Firestarters",5,9,4,true,0],[80,"Left plaster","Pestilence","Firestarters",15,32,15,true,0],[81,"Pill","Pestilence","Firestarters",17,36,18,true,0],[82,"Right catheter","Pestilence","Firestarters",5,9,4,true,0],[83,"Right plaster","Pestilence","Firestarters",15,32,15,true,0],[84,"Vial","Pestilence","Firestarters",22,45,22,true,0],[85,"Curved pipe","Pipe","Scavengers",9,23,5,false,10],[86,"Long pipe shield","Pipe","Scavengers",43,121,26,false,4],[87,"Pipe shield","Pipe","Scavengers",29,81,18,false,4],[88,"Straight pipe","Pipe","Scavengers",15,41,9,false,8],[89,"T-pipe","Pipe","Scavengers",8,21,4,false,10],[90,"Thick pipe mudguard","Pipe","Scavengers",24,66,14,false,4],[91,"Avia double slope","Plane","Nomads",54,130,42,false,4],[92,"Avia narrow slope","Plane","Nomads",5,12,4,false,8],[93,"Avia panel","Plane","Nomads",23,54,18,false,6],[94,"Avia panel large","Plane","Nomads",45,108,35,false,6],[95,"Avia panel small","Plane","Nomads",12,27,9,false,4],[96,"Avia slope","Plane","Nomads",10,24,8,false,12],[97,"Avia strut","Plane","Nomads",8,19,6,false,6],[98,"Avia wide slope","Plane","Nomads",20,48,15,false,6],[99,"Left avia fender","Plane","Nomads",53,128,42,false,4],[100,"Narrow wing","Plane","Nomads",50,121,40,false,4],[101,"Oblique slope","Plane","Nomads",19,44,14,false,10],[102,"Oblique slope narrow","Plane","Nomads",10,22,7,false,4],[103,"Oblique slope wide","Plane","Nomads",37,88,29,false,4],[104,"Oblique strut","Plane","Nomads",16,37,12,false,10],[105,"Plane air intake","Plane","Nomads",31,74,24,false,4],[106,"Plane nose","Plane","Nomads",13,31,10,false,10],[107,"Right avia fender","Plane","Nomads",53,128,42,false,4],[108,"Medium strut","Strut","Engineers",13,28,11,false,12],[109,"Small strut","Strut","Engineers",6,12,4,false,14],[110,"Torino bonnet","Torino","Engineers",94,213,84,false,2],[111,"Torino fender","Torino","Engineers",25,56,22,false,6],[112,"Torino nosecut","Torino","Engineers",40,90,35,false,2],[113,"Torino rear","Torino","Engineers",25,56,22,false,2],[114,"Canvas roof","Van","Engineers",60,135,35,false,6],[115,"Fender","Van","Engineers",25,56,22,false,8],[116,"Minivan sideboard","Van","Engineers",25,56,22,false,10],[117,"Rear door","Van","Engineers",86,196,77,false,3],[118,"Running board","Van","Engineers",15,34,13,false,6],[119,"Van ramp","Van","Engineers",6,12,4,false,14],[120,"Van side","Van","Engineers",20,45,18,false,7],[121,"Van window","Van","Engineers",23,51,20,false,8],[122,"Eastern front","War","Steppenwolfs",46,135,26,true,0],[123,"Home front","War","Steppenwolfs",105,314,62,true,0],[124,"Line of defence","War","Steppenwolfs",75,224,44,true,0],[125,"Vanguard","War","Steppenwolfs",31,90,18,true,0],[126,"Wedge","War","Steppenwolfs",61,180,35,true,0],[127,"Western front","War","Steppenwolfs",46,135,26,true,0]]');    
    partLimit = JSON.parse('50');
    massLimit = JSON.parse('4510');
    psLimit = JSON.parse('4510');
    props = JSON.parse('[["name","durability","mass","ps","limit","amount","dm","dp","faction","prestige","part"]]');
    cond = JSON.parse('[[""],[""]]');
    filter = JSON.parse('[["amount > 0"],[""]]');
    
    Logger.log('range: ' + range);
    Logger.log('partLimit: ' + partLimit);
    Logger.log('massLimit: ' + massLimit);
    Logger.log('props: ' + props);
    Logger.log('cond: ' + cond);
    Logger.log('filter: ' + filter);
  }
  
  if (debug) debugParams();
  else {
    // default parameters
    if (isBlank_(partLimit)) partLimit = Infinity;
    if (isBlank_(massLimit)) massLimit = Infinity;
    if (isBlank_(psLimit)) psLimit = Infinity;
  }
  
  // convert sheet range array to object
  var parts = rangeToObject_(range, function (p) {
    p.amount = 0;
    p.dm = p.durability / p.mass;
    p.dp = p.durability / p.ps;
  }, ['durability', 'mass', 'limit', 'ps']);
  
  // exclude parts according to conditions
  if (cond) applyConditions_(parts, rangeTo1DArray_(cond));
  
  sortArray_(parts, 'ps', true);
  sortArray_(parts, 'mass', true);
  sortArray_(parts, 'dm', true);
  
  // debugging loops
  if (debug) {
    var w = [
      {i: 0, s: 1000}
    ];
  }
  
  var recheck = {
    index: -1,
    parts: []
  };
  
  while (true) {
    if (debug) {
      if (w[0].i >= w[0].s) { 
        break; 
      } else {
        w[0].i++;
      }
    }
    
    var score = [];
    var partsLeft = partLimit - parts.reduce(function (a, c) {return a + c.amount}, 0);
    var massLeft = massLimit - parts.reduce(function (a, c) {return a + c.mass * c.amount;}, 0);
    var psLeft = psLimit - parts.reduce(function (a, c) {return a + c.ps * c.amount;}, 0);
    
    // determine score for each part
    for (var i in parts) {
      var massScore = massLeft / parts[i].mass;
      var psScore = psLeft / parts[i].ps;
      score.push(Math.min(
        partsLeft,
        massScore >= 1 ? massScore : 0,
        psScore >= 1 ? psScore : 0
      ) * parts[i].durability);
    }
    
    var best = {
      index: -1,
      score: 0,
    };
    
    // find the best part
    for (var i in parts) {
      if (score[i] > best.score && parts[i].amount < parts[i].limit) {
        best.score = score[i];
        best.index = i;
      }
    }
    
    if (best.index > -1) {
      // increment amount of part if there is improvement possible
      parts[best.index].amount++;
      
      // recheck parts if rechecking is initialized
      if (recheck.parts.length > 0) {
        // if a part not in the recheck list is incremented, reset the rechecking
        if (recheck.parts.indexOf(best.index) == -1) {
          recheck.index = -1;
          recheck.parts = [];
        }
      }
    } else {
      // recheck all parts if there is no improvement possible
      if (recheck.parts.length == 0) {
        for (var i in parts) {
          if (parts[i].amount > 0) recheck.parts.push(i);
        }
        
        recheck.index = 0;
      } else {
        // if rechecking is initialized, increment to the the next part to check
        if (recheck.index < recheck.parts.length - 1) recheck.index++;
        else {
          // break the loop if there is nothing to improve
          break;
        }
      }
      
      if (recheck.parts.length == 0) throw 'No parts available with the current parameters';
      
      parts[recheck.parts[recheck.index]].amount = 0;
    }
  }
  
  // exclude parts according to filter before returning it
  if (filter) applyConditions_(parts, rangeTo1DArray_(filter));
  
  // Sort the result based on order and the corresponding descending value.
  for (var i in order) {
    v = order[i][1];
    if (typeof order[i][1] == 'string') v = order[i][1].toLowerCase(); 
    var reverse;
    if (v == true || v == 'desc' || v == 'descending') reverse = true;
    else if (v == false || v == 'asc' || v == 'ascending') reverse = false;
    else throw 'Invalid descending value: ' + v + ', at index: ' + i;
    sortArray_(parts, order[i][0], reverse);
  }
  
  range = objectToRange_(parts, rangeTo1DArray_(props, false));
  
  if (debug) Logger.log('return: ' + range);
  
  return range;
}
