import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import { map } from 'rxjs/operators';

@Injectable()
export class PostProvider {
	server: string = "https://diegomauricioviveros.000webhostapp.com/server/";

	constructor(
		public http: Http
	) { }

	postData( body, file ) {
		
		let type = "application/json; charset=UTF-8";
		let headers = new Headers({ 'Content-Type': type });
		let options = new RequestOptions({ headers: headers });

		return this.http.post( this.server + file, JSON.stringify( body ), options )
		.pipe(map( res => res.json()));
	}
}
