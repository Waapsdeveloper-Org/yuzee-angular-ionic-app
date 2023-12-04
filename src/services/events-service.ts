import { Injectable } from '@angular/core';
import { ApiService } from 'yuzee-shared-lib';

@Injectable({
  providedIn: 'root'
})

export class EventsApiService {

  apiRoute: any = {};
  eventUrl = "event-service/api/v1/";
  instUrl = "institute/api/v1/";
  userUrl = 'users/api/v1/users/';

  constructor(public apiService: ApiService) {}

    getEvents(event) {
            return new Promise((resolve, reject) => {
                this.apiRoute.apiroute = this.eventUrl + 'event/pageNumber/'+ event.pageNumber +'/pageSize/5?start_date='+ event.start_date +'&end_date='+ event.end_date +'&event_type='+ event.event_type + '&latitude='+ event.latitude +'&longitude='+ event.longitude +'&radius='+ event.radius +'&event_status='+ event.event_status +'&event_category='+ event.event_category;
                this.apiService.get(this.apiRoute, 'h3')
                    .then((data: any) => {
                        resolve(data);
                    }).catch((error) => {
                        reject(error);
                    });
            });
    }

    getAllEventsInstituteUser(event){
        return new Promise((resolve, reject) => {
        this.apiRoute.apiroute = this.eventUrl + 'event/'+ event.entityId +'/pageNumber/'+ event.pageNumber +'/pageSize/10?socialite_type=' + event.socialite_type
        this.apiService.get(this.apiRoute, 'h3')
            .then((data: any) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getEventUserSelfJoined(event){
        return new Promise((resolve, reject) => {
        this.apiRoute.apiroute = this.eventUrl + 'user/event?status=' + event.status
        this.apiService.get(this.apiRoute, 'h3')
            .then((data: any) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getEventJoinCount(event_id){
        return new Promise((resolve, reject) => {
        this.apiRoute.apiroute = this.eventUrl + 'join/count/event/' + event_id
        this.apiService.get(this.apiRoute, 'h3')
            .then((data: any) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    joinEvent(event_id) {
        return new Promise((resolve, reject) => {
            this.apiRoute.apiroute = this.eventUrl + 'join/event/'+ event_id;
            this.apiService.put(this.apiRoute, 'h3')
                .then((data: any) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
        });
     }

     inviteUserEvent(event) {
        return new Promise((resolve, reject) => {
            this.apiRoute.apiroute = this.eventUrl + 'invite/user/'+ event.invitedUserId + '/event/' + event.event_id;
            this.apiService.put(this.apiRoute, 'h3')
                .then((data: any) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
        });
     }

     getUserJoinEvent(){
        return new Promise((resolve, reject) => {
        this.apiRoute.apiroute = this.eventUrl + 'user/event'
        this.apiService.get(this.apiRoute, 'h3')
            .then((data: any) => {
                resolve(data);
            }).catch((error) => {
                reject(error);  
            });
        });
    }

    changeInvitationStatus(event) {
        return new Promise((resolve, reject) => {
            this.apiRoute.apiroute = this.eventUrl + 'invite/change/status/event/'+ event.event_id + '/status=' + event.status;
            this.apiService.put(this.apiRoute, 'h3')
                .then((data: any) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
        });
    }


    getEventsCategory(){
        return new Promise((resolve, reject) => {
        this.apiRoute.apiroute = this.eventUrl + 'event/category'
        this.apiService.get(this.apiRoute, 'h3')
            .then((data: any) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

  addEvent(eventObj,eventParms) {
      return new Promise((resolve, reject) => {
          this.apiRoute.apiroute = this.eventUrl + 'event?socialite_type='+ eventParms.socialite_type +'&institute_id=' + eventParms.institute_id;
          this.apiRoute.data = eventObj
          this.apiService.post(this.apiRoute, 'h3')
              .then((data: any) => {
                  resolve(data);
              }).catch((error) => {
                  reject(error);
              });
      });
  }

  updateEvent(eventObj,eventParms) {
    return new Promise((resolve, reject) => {
        this.apiRoute.apiroute = this.eventUrl + 'event/'+ eventParms.event_id +'/?socialite_type='+ eventParms.socialite_type +'&institute_id=' + eventParms.institute_id;
        this.apiRoute.data = eventObj;
        this.apiService.put(this.apiRoute, 'h3')
            .then((data: any) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
    });
 }


  deleteEvent(event) {
        return new Promise((resolve, reject) => {
            this.apiRoute.apiroute = this.eventUrl + 'event/'+ event.event_id +'?socialite_type='+ event.socialite_type +'&institute_id=' + event.institute_id;
            this.apiService.delete(this.apiRoute, 'h3')
                .then((data: any) => {
                    resolve(data);
                }).catch((error) => {

                    reject(error);
                });
        });
 }

 updateUserInfo(updateObj,userId) {
    return new Promise((resolve, reject) => {
        this.apiRoute.apiroute = this.userUrl + 'users/' + userId;
        this.apiRoute.data = updateObj;
        this.apiService.put(this.apiRoute, 'h3')
            .then((data: any) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
    });
}
 


}