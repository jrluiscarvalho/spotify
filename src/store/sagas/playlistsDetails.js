import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as PlaylistsDetailsActions } from '../ducks/playlistsDetails';
import { Creators as ErrorActions } from '../ducks/error';

export function* getPlaylistsDetails(action) {
  try {
    const response = yield call(api.get, `/playlists/${action.payload.id}?_embed=songs`)
    yield put(PlaylistsDetailsActions.getPlaylistsDetailsSuccess(response.data))
  } catch (error) {
    yield put(ErrorActions.setError('Não foi possivel obter os detalhes da playlist'))
  }
}