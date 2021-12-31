import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map, firstValueFrom, catchError } from 'rxjs';
import { AxiosResponse } from 'axios';

const summonner = () => ({
  id: 'HiLtqEikSMUc_PdapBaPb35-tYXRQR0yHZT06qqJE-GTFw',
  accountId: 'S9VVZ5WE6QMT9N2zcDRj9GYLfbkGs-woVCyQsMAzG_jE',
  puuid: 'zaNp_bciXR3WhRBXXymGXw0peFCqOfipdA1od1h8gtnT_A9q0dDYpUGbeoaU-1IF3h5H5jayqLlckg',
  name: '너의옆자리',
  profileIconId: 5063,
  revisionDate: 1640783591133,
  summonerLevel: 348,
});

type ISummonner = ReturnType<typeof summonner>;

@Injectable()
export class ProfileService {
  constructor(private httpService: HttpService) {}
  async getProfile(name: string) {
    const summonner = await firstValueFrom(this.getSummonner(name));
    const matchIds = await firstValueFrom(this.getMatchIds(summonner.puuid));
    const matchs = await Promise.all(matchIds.map((id) => firstValueFrom(this.getMatchs(id))));

    console.log(summonner);

    return {
      summonner,
      matchs,
    };
  }

  getSummonner(name: string): Observable<ISummonner> {
    return this.httpService
      .get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(name)}`)
      .pipe(
        map((res) => res.data),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }

  getMatchIds(puuid: string): Observable<string[]> {
    return this.httpService
      .get(`https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=10`)
      .pipe(
        map((res) => res.data),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }

  getMatchs(id: string): Observable<object> {
    return this.httpService.get(`https://asia.api.riotgames.com/tft/match/v1/matches/${id}`).pipe(
      map((res) => res.data),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }
}
