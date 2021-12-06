function bubbleSort(list) {
    let upperIndex = list.length - 1;
  
    while (upperIndex > 0) {
      let swapIndex = 0;
  
      for (let i = 0; i < upperIndex; i += 1) {
        if (shouldSwap(list, i, i + 1)) {
            swap(list, i, i + 1);
            swapIndex = i;
        }
      }
  
      upperIndex = swapIndex;
    }
  
    return list;
};

function selectionSort(list) {
    for (let i = 0; i < list.length - 1; i += 1) {
      let selectedIndex = i;
  
      for (let j = i + 1; j < list.length; j += 1) {
        if (shouldSwap(list, selectedIndex, j)) {
          selectedIndex = j;
        }
      }
  
      if (selectedIndex !== i) {
        swap(list, selectedIndex, i);
      }
    }
    return list;
};

function insertionSort(list) {
    for (let i = 1; i < list.length; i += 1) {
      let insertionIndex = i;
  
      for (let j = i - 1; j >= 0; j -= 1) {
        if (shouldSwap(list, j, insertionIndex)) {
          swap(list, j, insertionIndex);
          insertionIndex = j;
        }
      }
    }
  
    return list;
};

function heapSort(list) {
    const compare = (a, b) => (a < b ? -1 : 1);

    const getParentIndex = (childIndex) => (
      Math.floor((childIndex - 1) / 2)
    );
  
    const getLeftChildIndex = (parentIndex) => (
      (parentIndex * 2) + 1
    );
  
    const getRightChildIndex = (parentIndex) => (
      (parentIndex * 2) + 2
    );
  
    const shouldSwap = (i, j) => (
      i >= 0 && j >= 0
      && i < list.length
      && j < list.length
      && compare(list[j], list[i]) > 0
    );

    const heapifyUp = (i) => {
      let childIndex = i;
      let parentIndex = getParentIndex(childIndex);
  
      while (shouldSwap(parentIndex, childIndex)) {
        swap(list, parentIndex, childIndex);
        childIndex = parentIndex;
        parentIndex = getParentIndex(childIndex);
      }
    };
  
    const heapify = () => {
      for (let i = 0; i < list.length; i += 1) {
        heapifyUp(i);
      }
      return list;
    };
  
    const compareChildrenBefore = (i, leftIndex, rightIndex) => {
      if (shouldSwap(leftIndex, rightIndex) && rightIndex < i) {
        return rightIndex;
      }
  
      return leftIndex;
    };
  
    const heapifyDownUntil = (i) => {
      let parentIndex = 0;
      let leftIndex = 1;
      let rightIndex = 2;
      let childIndex;
  
      while (leftIndex < i) {
        childIndex = compareChildrenBefore(i, leftIndex, rightIndex);
  
        if (shouldSwap(parentIndex, childIndex)) {
          swap(list, parentIndex, childIndex);
        }
  
        parentIndex = childIndex;
        leftIndex = getLeftChildIndex(parentIndex);
        rightIndex = getRightChildIndex(parentIndex);
      }
    };
  
    heapify();
    for (let i = list.length - 1; i > 0; i -= 1) {
      swap(list, 0, i);
      heapifyDownUntil(i);
    }
  
    return list;
  };

function quickSort(list) {
    const sortRecursively = (startIndex = 0, endIndex = list.length - 1) => {
      const pivotIndex = startIndex;
      let lowerIndex = startIndex;
      let higherIndex = endIndex;
  
      while (lowerIndex <= higherIndex) {
        while (shouldSwap(list, pivotIndex, lowerIndex) && lowerIndex < endIndex) {
          lowerIndex += 1;
        }
  
        while (!shouldSwap(list, pivotIndex, higherIndex) && higherIndex > startIndex) {
          higherIndex -= 1;
        }
  
        if (lowerIndex <= higherIndex) {
          swap(list, lowerIndex, higherIndex);
          lowerIndex += 1;
          higherIndex -= 1;
        }
      }
  
      if (startIndex < higherIndex) {
        sortRecursively(startIndex, higherIndex);
      }
  
      if (lowerIndex < endIndex) {
        sortRecursively(lowerIndex, endIndex);
      }
  
      return list;
    };
  
    return sortRecursively();
};


function shouldSwap (list, i, j) { // i < j
    comparisons++;
    if (list[i] > list[j]) {return true} else {return false};
};

animlist = [];
items = document.getElementsByClassName('item');
function swap (list, i, j) { // i < j
    temp = list[j];
    list[j] = list[i];
    list[i] = temp;

    animlist.push([i,j,j-i])
};

function highlight(a,b) {
    N = window.N;

    a.style.backgroundColor = document.getElementById('col').value + '0' + Math.floor(255 * a.value / N).toString(16);
    b.style.backgroundColor = document.getElementById('col').value + '0' + Math.floor(255 * b.value / N).toString(16);

    a.style.backgroundColor = document.getElementById('col').value + Math.floor(255 * a.value / N).toString(16);
    b.style.backgroundColor = document.getElementById('col').value + Math.floor(255 * b.value / N).toString(16);
};

function animate(i, j, d) {
    a = document.getElementById(i);
    b = document.getElementById(j);

    a.style.backgroundColor = 'red';
    b.style.backgroundColor = 'red';

    setTimeout(highlight, time/totalSwaps*0.9, a, b)

    swaps++;
    document.getElementById('stat').innerHTML = swaps+' swaps';

    temp1 = a.id
    a.style.order = j;
    a.id = b.id;
    b.style.order = i;
    b.id = temp1;

    playNote(a.value/N*1000,100);
    playNote(b.value/N*1000,100);
    
    // TODO: Animation
};

function animation(sortName) {
    swaps = 0;
    var startTime = performance.now();
    if (sortName == 'bubble') { 
        bubbleSort(list);
    } else if (sortName == 'selection') {
        selectionSort(list);
    } else if (sortName == 'insertion') {
        insertionSort(list);
    } else if (sortName == 'heap') {
        heapSort(list);
    } else if (sortName == 'quick') {
        quickSort(list);
    };
    var endTime = performance.now();
    var sortTime = Math.round((endTime - startTime)*100)/100;
    var startTimeJS = performance.now();
    list.sort();
    var endTimeJS = performance.now();
    var sortTimeJS = Math.round((endTimeJS - startTimeJS)*100)/100;
    document.getElementById('perf').innerHTML = 'Sorting took '+sortTime+' ms, which is ~'+Math.round(sortTime/sortTimeJS*100)/100+' times more than the '+sortTimeJS+' ms that JavaScript .sort() took.&nbsp;'
    totalSwaps = animlist.length;
    for(let i = 0; i < totalSwaps; i++) {
        setTimeout(animate, time/totalSwaps*i, animlist[i][0],animlist[i][1],animlist[i][2]);
    }
    algName = sortName.charAt(0).toUpperCase() + sortName.slice(1);
    if (comparisons > 0) {
      setTimeout(() => {document.getElementById('stat').innerHTML = algName+' sort made '+totalSwaps+' swaps, '+comparisons+' comparisons';}, time);
    };
    //console.log('N = '+N+', Total swaps: '+totalSwaps+' Comparisons: '+comparisons)
};

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration) {
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
    }, duration);
};

function generateItems(N) {
    playNote(500+Math.random()*2000,300);

    document.getElementById('display').innerHTML = '';
    list = [];
    animlist = [];
    comparisons = 0;
    time = document.getElementById('Tin').value*1000;
    N = document.getElementById('Nin').value;
    window.N = document.getElementById('Nin').value;
    document.documentElement.style.setProperty('--item-width', window.innerWidth / N);
    for (var i = 0; i < N;i++) {
        let div = document.createElement("div");
        div.id = i;
        div.className = 'item';
        div.style.order = i;
        div.style.height = '100%';
        div.style.width = window.innerWidth / N;
        div.style.margin = window.innerWidth * 0.05 / N;
        div.style.border = '1px solid black';

        var value = Math.random()*N;
        var randomColor = Math.floor(255*value/N);

        var displayHeight = window.innerHeight * 0.7;
        div.value = value;
        div.style.marginTop = displayHeight*(N-value)/N + 'px'; 
        div.style.height = displayHeight*value/N + 'px'; 
        div.style.backgroundColor = document.getElementById('col').value+randomColor.toString(16);

        document.getElementById('display').appendChild(div);
        list.push(value);
    }
};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function recolor(N) {
    playNote(500+Math.random()*2000,300);
    var items = document.getElementsByClassName('item');
    for (var i = 0; i < N;i++) {
        items[i].style.backgroundColor = document.getElementById('col').value+Math.floor(255*items[i].value/N).toString(16);     
    };
    c = hexToRgb(document.getElementById('col').value);
    l = [c.r,c.g,c.b].indexOf(Math.max(c.r,c.g,c.b));
    switch (l) {
        case 0: document.body.style.background = 'rgb('+c.r*2+', 200, 200)'; break;
        case 1: document.body.style.background = 'rgb(200, '+c.g*2+', 200)'; break;
        case 2: document.body.style.background = 'rgb(200, 200, '+c.b*2+')'; break;
    }

    localStorage.setItem('color', document.getElementById('col').value);
}