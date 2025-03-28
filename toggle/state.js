const KEY = "state"

/**
 * 
 * @param {Object} state 
 */

function saveState(state) {

  if (typeof state !== 'object' || state === null || Array.isArray(state)) {
    console.warn("객체만 저장 가능"); 
    return; 
  }

  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
}

/**
 * 
 * @returns {object | null}
 */

function loadState() {
    try {
        const loadedState = localStorage.getItem(KEY);
        return loadedState ? JSON.parse(loadedState) : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export {saveState, loadState} 