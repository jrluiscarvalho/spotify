import React, {Component} from 'react';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as PlaylistsDetailsActions } from '../../store/ducks/playlistsDetails';
import {Creators as PlayerActions } from '../../store/ducks/player';

import {Container, Header, SongList, SongItem} from './styles'

import Loading from '../../components/loading';

import ClockIcon from '../../assets/clock.svg'
import PlusIcon from '../../assets/plus.svg'

class Playlist extends Component{

  state = {
    selectedSong: null
  }

  componentDidMount(){
    this.loadPlaylistDetails();
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.id !== this.props.match.params.id){
      this.loadPlaylistDetails();
    }
  }

  loadPlaylistDetails(){
    const {id} = this.props.match.params;

    this.props.getPlaylistsDetailsRequest(id);
  }

  renderDetails = () => {

    const playlist = this.props.playlistsDetails.data;
    return (
    <Container>
      <Header>
        <img 
          src={playlist.thumbnail} 
          alt={playlist.title}/>
        <div>
          <span>PLAYLIST</span>
          <h1>{playlist.title}</h1>
          {!!playlist.songs && <p>{playlist.songs.lenght} músicas</p>}
  
          <button>PLAY</button>
        </div>
      </Header>
    <SongList cellPadding={0} cellSpacing={0}>
      <thead>
        <th/>
        <th>Titulo</th>
        <th>Artista</th>
        <th>Álbum</th>
        <th>
          <img src={ClockIcon} alt="Duração" />
        </th>
      </thead>
  
      <tbody>
        {!playlist.songs ? (
          <tr>
            <td colSpan={5}>Nenhuma música cadastrada</td>
          </tr>
        ) : (
          playlist.songs.map(song => (
            <SongItem  
              key={song.id} 
              onClick={() => this.setState({selectedSong: song.id})}
              onDoubleClick={() => this.props.loadSong(song, playlist.songs)}
              selected={this.state.selectedSong === song.id}
              playing={this.props.currentSong && this.props.currentSong.id === song.id}>
              <td>
                <img src={PlusIcon} alt="Adicionar" />
              </td>
              <td>{song.title}</td>
              <td>{song.author}</td>
              <td>{song.album}</td>
              <td>3:26</td>
            </SongItem  >
          ))
        )
        }
      </tbody>
    </SongList>
    </Container>
    )
  }

  render(){
    return this.props.playlistsDetails.loading ? <Container loading><Loading /></Container> : (this.renderDetails())
  }
}

const mapStateToProps = state => ({
  playlistsDetails: state.playlistsDetails,
  currentSong: state.player.currentSong
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {...PlaylistsDetailsActions, 
    ...PlayerActions
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)