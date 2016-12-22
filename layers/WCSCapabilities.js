// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../kernel","../geometry/Extent"],function(e,t,i,r,n){var a=function(e,t){if(null===e||null===t||null===e.tagName||void 0===e.tagName)return!1;var i=e.tagName.toLowerCase(),r=t.toLowerCase();return i===r||i.indexOf(":"+r)>0},s=e(null,{declaredClass:"esri.layers.WCSCapabilities",version:null,name:null,onlineResources:null,coverages:null,supportedFormats:null,supportedVersions:null,profiles:null,supportedInterpolations:null,constructor:function(e){this._parse=t.hitch(this,this._parse),e&&t.mixin(this,this._parse(e))},_parse:function(e){var t=this._getElement(e,"Capabilities")||this._getElement(e,"WCS_Capabilities");if(null===t)throw"not a valid capabilities file -- cannot find Capabilities or WCS_Capabilities root element";var i=t.getAttribute("version");switch(this.version=i,i){case"1.0.0":this._parse100(e);break;case"1.1.0":case"1.1.1":case"1.1.2":this._parse110(e);break;case"2.0.1":this._parse201(e);break;default:throw"unsupported WCS version "+i}},_getElements:function(e,t){if(!e)return null;if(!t)return e;var i=t;return t.indexOf("/")>-1?(i=t.slice(0,t.indexOf("/")),t=t.slice(t.indexOf("/")+1)):t="",t?this._getElement(e,i).getElementsByTagNameNS("*",t):e.getElementsByTagNameNS("*",i)},_getElement:function(e,t){if(!e)return null;if(!t)return e;var i=t;t.indexOf("/")>-1?(i=t.slice(0,t.indexOf("/")),t=t.slice(t.indexOf("/")+1)):t="";var r=this._getElements(e,i);return r.length>0?t?this._getElement(r[0],t):r[0]:null},_getElementValue:function(e,t){var i,r=this._getElement(e,t);return r?(i=r.textContent||r.text||r.nodeValue||r.innerText,i?i.trim():null):null},_getElementValues:function(e,t){var i,r,n=this._getElements(e,t),a=[];for(r=0;r<n.length;r++)i=n[r].textContent||n[r].text||n[r].nodeValue||n[r].innerText,i&&(i=i.trim(),""!==i&&a.push(i));return a},_removeTrailingQuestionMark:function(e){return e?e.indexOf("?")===e.length-1?e.substring(0,e.length-1):e:null},_parse100:function(e){var t=this._getElement(e,"Service");this.name=this._getElementValue(t,"name"),this.supportedVersions=["1.0.0"];var i={},r=this._getElement(e,"Capability");i.getCapabilities=this._removeTrailingQuestionMark(this._getElement(r,"GetCapabilities/Get/OnlineResource").getAttribute("xlink:href")),i.describeCoverage=this._removeTrailingQuestionMark(this._getElement(r,"DescribeCoverage/Get/OnlineResource").getAttribute("xlink:href")),i.getCoverage=this._removeTrailingQuestionMark(this._getElement(r,"GetCoverage/Get/OnlineResource").getAttribute("xlink:href")),this.onlineResources=i;var a,s,l,o,u,g,m=this._getElements(e,"CoverageOfferingBrief"),h=[];for(a=0;a<m.length;a++)s=m[a],l={},l.id=this._getElementValue(s,"name"),l.label=this._getElementValue(s,"label"),l.description=this._getElementValue(s,"description"),o=this._getElements(s,"pos"),u=this._getElementValue(o[0]).split(" "),g=this._getElementValue(o[1]).split(" "),l.lonLatEnvelope=new n({xmin:parseFloat(u[0]),ymin:parseFloat(u[1]),xmax:parseFloat(g[0]),ymax:parseFloat(g[1]),spatialReference:{wkid:4326}}),h.push(l);return this.coverages=h,!0},_parse110:function(e){var i=t.hitch(this,function(e){var t,r,s,l,o;for(r={},s=0;s<e.childNodes.length;s++)t=e.childNodes[s],a(t,"title")?r.title=this._getElementValue(t):a(t,"abstract")?r["abstract"]=this._getElementValue(t):a(t,"identifier")?r.id=this._getElementValue(t):a(t,"WGS84BoundingBox")?(l=this._getElementValue(t,"LowerCorner").split(" "),o=this._getElementValue(t,"UpperCorner").split(" "),r.lonLatEnvelope=new n({xmin:parseFloat(l[0]),ymin:parseFloat(l[1]),xmax:parseFloat(o[0]),ymax:parseFloat(o[1]),spatialReference:{wkid:4326}})):a(t,"CoverageSummary")&&(r.coverageSummaries=r.coverageSummaries||[],r.coverageSummaries.push(i(t)));return r}),r=function(e,t){var i;if(e.coverageSummaries)for(i=0;i<e.coverageSummaries.length;i++)e.coverageSummaries[i]["abstract"]=e.coverageSummaries[i]["abstract"]||e["abstract"],e.coverageSummaries[i].lonLatEnvelope=e.coverageSummaries[i].lonLatEnvelope||e.lonLatEnvelope,e.coverageSummaries[i].title=e.coverageSummaries[i].title||e.title,r(e.coverageSummaries[i],t);void 0!==e.id&&t.push(e)};this.name=this._getElementValue(e,"ServiceIdentification/Title"),this.supportedVersions=this._getElementValues(e,"ServiceIdentification/ServiceTypeVersion");var s={},l=this._getElement(e,"OperationsMetadata");s.getCapabilities=this._removeTrailingQuestionMark(this._getElement(l.querySelector("Operation[name=GetCapabilities]"),"Get").getAttribute("xlink:href")),s.describeCoverage=this._removeTrailingQuestionMark(this._getElement(l.querySelector("Operation[name=DescribeCoverage]"),"Get").getAttribute("xlink:href")),s.getCoverage=this._removeTrailingQuestionMark(this._getElement(l.querySelector("Operation[name=GetCoverage]"),"Get").getAttribute("xlink:href")),this.onlineResources=s;var o,u,g=this._getElement(e,"Contents"),m=[];for(o=0;o<g.childNodes.length;o++)u=g.childNodes[o],a(u,"coveragesummary")&&r(i(u),m);this.coverages=m;var h=[],p=this._getElements(g,"SupportedFormat");for(o=0;o<p.length;o++)h.push(this._getElementValue(p[o]));return this.supportedFormats=h,!0},_parse201:function(e){var t,i=this._getElement(e,"ServiceIdentification");this.name=this._getElementValue(i,"Title"),this.supportedVersions=this._getElementValues(i,"ServiceTypeVersion");var r=this._getElements(i,"Profile"),a=[];for(t=0;t<r.length;t++)a.push(this._getElementValue(r[t]));this.profiles=a;var s={},l=this._getElement(e,"OperationsMetadata");s.getCapabilities=this._removeTrailingQuestionMark(this._getElement(l.querySelector("Operation[name=GetCapabilities]"),"Get").getAttribute("xlink:href")),s.describeCoverage=this._removeTrailingQuestionMark(this._getElement(l.querySelector("Operation[name=DescribeCoverage]"),"Get").getAttribute("xlink:href")),s.getCoverage=this._removeTrailingQuestionMark(this._getElement(l.querySelector("Operation[name=GetCoverage]"),"Get").getAttribute("xlink:href")),this.onlineResources=s;var o,u,g,m,h,p=this._getElements(e,"Contents/CoverageSummary"),c=[];for(t=0;t<p.length;t++)o=p[t],u={},u.id=this._getElementValue(o,"CoverageId"),g=this._getElement(o,"WGS84BoundingBox"),g&&(m=this._getElementValue(g,"LowerCorner").split(" "),h=this._getElementValue(g,"UpperCorner").split(" "),u.lonLatEnvelope=new n({xmin:parseFloat(m[0]),ymin:parseFloat(m[1]),xmax:parseFloat(h[0]),ymax:parseFloat(h[1]),spatialReference:{wkid:4326}})),c.push(u);this.coverages=c;var v=this._getElement(e,"ServiceMetadata"),_=this._getElements(v,"formatSupported"),f=[];for(t=0;t<_.length;t++)f.push(this._getElementValue(_[t]));this.supportedFormats=f;var d=this._getElements(v,"interpolationSupported"),E=[];for(t=0;t<d.length;t++)E.push(this._getElementValue(d[t]));return this.supportedInterpolations=E.map(function(e){var t=null;return e.toLowerCase().indexOf("nearest")>-1?t=0:e.toLowerCase().indexOf("linear")>-1?t=1:e.toLowerCase().indexOf("cubic")>-1&&(t=2),t}).filter(function(e){return null!==e}),!0}});return i("extend-esri")&&t.setObject("layers.WCSCapabilities",s,r),s});