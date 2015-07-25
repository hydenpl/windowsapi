$.ajaxSetup({cache: false}); //TODO do usunięcia

var counter = 0;
var animationState = 0;
var animationDuration = 30;

var historyIdCounter = 0;

var drugHistory = [];

var parameters = {
    "sleepness":{
      "name": "Zmęczenie",
      "goal": 0,
      "val": 50,
      "diff": 10
    },
    "heart":{
      "name": "Bicie serca",
      "goal": 100,
      "val": 85,
      "diff": 20
    },
    "hydration":{
      "name": "Nawodnienie",
      "goal": 100,
      "val": 20,
      "diff": -10
    },
    "breath":{
      "name": "Oddech",
      "goal": 0,
      "val": 50,
      "diff": 0
    }
};

var drugs = {
    "amfetamina": {
        "type":"drug",
        "title": "Amfetamina",
        "shortcut": "Am",
        "color": "#ff3333",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "cukierek": {
        "type":"drug",
        "title": "Cukierek",
        "shortcut": "Cu",
        "color": "#e5d73d",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "dopalacze": {
        "type":"drug",
        "title": "Dopalacze",
        "shortcut": "Do",
        "color": "#309bf6",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "kebab": {
        "type":"drug",
        "title": "Kebab",
        "shortcut": "Ke",
        "color": "#f59c00",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "kokaina": {
        "type":"drug",
        "title": "Kokaina",
        "shortcut": "Ko",
        "color": "#3dd7e5       ",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "marihuana": {
        "type":"drug",
        "title": "Marihuana",
        "shortcut": "Ma",
        "color": "#0bd636",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "mdma": {
        "type":"drug",
        "title": "MDMA",
        "shortcut": "Md",
        "color": "#e5d73d",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "mefedron": {
        "type":"drug",
        "title": "Mefedron",
        "shortcut": "Me",
        "color": "#c761b5",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "odpoczynek": {
        "type":"drug",
        "title": "Odpoczynek",
        "shortcut": "Od",
        "color": "#0bd636",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "piwo": {
        "type":"drug",
        "title": "Piwo",
        "shortcut": "Pi",
        "color": "#f59c00",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "powietrze": {
        "type":"drug",
        "title": "Powietrze",
        "shortcut": "Po",
        "color": "#3dd7e5",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "wino": {
        "type":"drug",
        "title": "Wino",
        "shortcut": "Wi",
        "color": "#ff3333",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "woda": {
        "type":"drug",
        "title": "Woda",
        "shortcut": "Wo",
        "color": "#309bf6",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    },
    "wodka": {
        "type":"drug",
        "title": "Wódka",
        "shortcut": "Vo",
        "color": "#f59c00",
        "params": {
            "sleepness": -20,
            "heart": 20,
            "hydration": 0,
            "breath": 20
        }
    }
};

var buttons;