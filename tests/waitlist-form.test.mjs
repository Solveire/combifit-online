import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=readFileSync('waitlist.js','utf8'),html=readFileSync('wachtlijst/index.html','utf8');
assert.match(html,/name="privacyConsent" type="checkbox" required/);assert.match(html,/<option>Combifit Community<\/option>/);assert.match(html,/<option>Persoonlijke coaching<\/option>/);
async function fixture({valid=true,result={ok:true},responseOk=true,configOk=true}={}){
 let handler,callbacks,requests=[];const button={disabled:true,textContent:''},message={textContent:'',hidden:false},security={textContent:''},success={hidden:true,focus(){this.focused=true}},form={hidden:false,querySelector:()=>button,reportValidity:()=>valid,addEventListener:(_,h)=>handler=h};
 const values={name:'Local browser test',email:'local@example.com',phone:'0612345678',program:'Combifit Community',privacyConsent:'on',website:''};
 const context={document:{getElementById:id=>({'combifit-waitlist-form':form,'combifit-wl-status':message,'combifit-wl-security':security,'combifit-wl-success':success}[id]),createElement:()=>({}),head:{appendChild(script){script.onload()}}},window:{turnstile:{render(_,options){callbacks=options;return 1},reset(){}}},fetch:async(url,options)=>{requests.push({url,options});return options?.method==='POST'?{ok:responseOk,json:async()=>result}:{ok:configOk,json:async()=>({siteKey:'public-site-key'})}},FormData:class{get(name){return values[name]}},AbortSignal:{timeout:()=>undefined}};
 vm.runInNewContext(source,context);await new Promise(setImmediate);return{button,message,form,success,requests,callbacks,submit:()=>handler({preventDefault(){}})};
}
const okay=await fixture();assert.ok(okay.button.disabled);okay.callbacks.callback('verified-token');assert.equal(okay.button.disabled,false);await okay.submit();assert.equal(okay.form.hidden,true);assert.equal(okay.success.hidden,false);assert.equal(okay.success.focused,true);const payload=JSON.parse(okay.requests[1].options.body);assert.equal(payload.privacyConsent,true);assert.equal(payload.turnstileToken,'verified-token');assert.equal(okay.requests[1].options.credentials,'omit');
const failed=await fixture({responseOk:false,result:{error:'Opslaan mislukt'}});failed.callbacks.callback('verified-token');await failed.submit();assert.equal(failed.form.hidden,false);assert.equal(failed.message.textContent,'Opslaan mislukt');
const invalid=await fixture({valid:false});invalid.callbacks.callback('token');await invalid.submit();assert.equal(invalid.requests.length,1);
const offline=await fixture({configOk:false});assert.equal(offline.button.disabled,true);assert.match(offline.message.textContent,/tijdelijk niet beschikbaar/);
console.log('Passed: required privacy field, programs, disabled-until-verified submission, payload, validation, success focus, error preservation and unavailable configuration. No live requests.');

const landing=readFileSync('index.html','utf8');assert.match(landing,/href="wachtlijst\/"/);assert.ok(!landing.includes('id="combifit-waitlist-form"'));assert.match(html,/src="\.\.\/waitlist.js"/);assert.match(html,/href="\.\.\/waitlist.css"/);assert.match(html,/<main>/);assert.match(html,/alt="JJ’s Combifit Driel"/);console.log('Passed: standalone /wachtlijst/ route, original logo, relative assets and landing-page link; no duplicated form on landing page.');
