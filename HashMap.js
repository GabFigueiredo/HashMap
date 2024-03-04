class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap {
    constructor() {
        this.bucketArray = new Array(16).fill(null);
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        };
     
        return hashCode % 16;
      };
      
      set(key, value) {
        const hashKey = this.hash(key);
        const newHash = new Node(key, value);
        if (this.has(key)) {
            if(this.bucketArray[hashKey] === null) {
                this.bucketArray[hashKey] =  newHash;
            } else {
                let current = this.bucketArray[hashKey];
                while(current.next !== null) {
                    current = current.next;
                };
                current.next = newHash;
            }
        } else {
            this.bucketArray[hashKey] = newHash;
        };
      };

      has(key) {
        const hashKey = this.hash(key);
        if (this.bucketArray[hashKey] !== null) {
            return true;
        }
        return false;
      };

      get(key) {
        const hashKey = this.hash(key);
        if(this.bucketArray[hashKey] !== null) {
            return this.bucketArray[hashKey].value;
        };
      };

      remove(key) {
        const hashKey = this.hash(key);
        if(this.bucketArray[hashKey] !== null) {
            this.bucketArray[hashKey] = null;
        } else {
            return false;
        }
      }

      length() {
        let result = 0;
        for (let i = 0; i < this.bucketArray.length; i++) {
            let current = this.bucketArray[i]
            if(current !== null) {
                result++

                while (current.next !== null) {
                    result++;
                    current = current.next;
                }
            }
            
        }
        return result;
      }

      clear() {
        this.bucketArray = new Array(16).fill(null);
        return true;
      }

      keys() {
        const array = []
        this.bucketArray.forEach(element => {
            if (element !== null) {
                array.push(element.key);

                while(element.next !== null) {
                    array.push(element.next.key);
                    element = element.next;
                }
            }
        })
        return array;
      }

      values() {
        const array = []
        this.bucketArray.forEach(element => {
            if (element !== null) {
                array.push(element.value);

                while(element.next !== null) {
                    array.push(element.next.value);
                    element = element.next;
                }
            }
        })
        return array;
      }

      entries() {
        const array = [];
        this.bucketArray.forEach(element => {
            if(element !== null) {
                array.push([element.key, element.value]);

                while (element.next !== null) {
                    array.push([element.next.key, element.next.value]);
                    element = element.next;
                }
            }
        })
        return array;
      }

};
