import CommonDataManager from '../Services/Singleton';
import endPoints from '../Services/EndPoints';

export function sessionMaintain(historyParam) {
  localStorage.clear();
  sessionStorage.clear();
  historyParam.replace('/login');
}

export function getValueForFieldName(name, defaultValue, array) {
  return array.find((find) => find.name === name)
    ? array.find((find) => find.name === name).value
    : defaultValue;
}

export function getValueForFieldDisplayName(displayName, defaultValue, array) {
  return array.find((find) => find.displayName === displayName)
    ? array.find((find) => find.displayName === displayName).value
    : defaultValue;
}

export function getValueForFieldId(fieldId, defaultValue, array) {
  let value = defaultValue;
  if (array.find((find) => getFieldID(find.fieldId) === fieldId)) {
    let fieldValue = array.find((find) => getFieldID(find.fieldId) === fieldId)
      .value;
    if (fieldValue.length > 0) {
      value = fieldValue;
    }
  }
  // return array.find(find => getFieldID(find.fieldId) === fieldId) ? array.find(find => getFieldID(find.fieldId) === fieldId).value: defaultValue;
  return value;
}

export function getObjectForFieldId(fieldId, array) {
  return array.find((find) => getFieldID(find.fieldId) === fieldId)
    ? array.find((find) => getFieldID(find.fieldId) === fieldId)
    : undefined;
}

export function getFieldForFieldId(fieldId, array) {
  return array.find((find) => getFieldID(find.fieldId) === fieldId)
    ? array.find((find) => getFieldID(find.fieldId) === fieldId)
    : null;
}

export function getFieldID(fieldID) {
  if (fieldID.includes('BO:')) {
    fieldID = fieldID.split(',')[1].split(':')[1];
  }
  return fieldID;
}

export function generateCreateFieldObject(fieldID, value, dirty = true) {
  return {
    dirty: dirty,
    fieldId: fieldID,
    value: value,
  };
}

export function generateFieldObject(fieldID, value, operator = 'equals') {
  return {
    fieldId: fieldID,
    operator: operator,
    value: value,
  };
}

export function generateSortingObject(fieldID, sortDirection) {
  return {
    fieldId: fieldID, //Last Mod Date
    sortDirection: sortDirection,
  };
}

export function getImage(linkedImage) {
  let base = CommonDataManager.getInstance().baseInstanceUrl;
  let image = endPoints.getImage;
  return base + '/' + image + linkedImage;
}

export function getFileSize(file) {
  let fileSize = file.file.fileSize;
  if (fileSize === undefined) {
    fileSize = file.file.size;
  }
  return fileSize;
}

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
