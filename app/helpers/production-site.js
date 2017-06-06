import Ember from 'ember';

export function productionSite(params/*, hash*/) {
  let answer
  if(!params === ''){
    answer = params
  } else { answer = 'iOS app not in production'}
  return answer
}

export default Ember.Helper.helper(productionSite);
