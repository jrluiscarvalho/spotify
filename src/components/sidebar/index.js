import React, {Component} from 'react'
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as PlaylistsActions } from '../../store/ducks/playlists';

import { Container, NewPlaylist, Nav } from './styles'

import AddPlaylistIcon from '../../assets/add_playlist.svg'

class Sidebar extends Component {
  componentDidMount(){
    this.props.getPlaylistsRequest();
    console.log(this.props)
  }

  render(){
    return (
      <Container>
        <div>
          <Nav main>
            <li>
              <Link to="/">Navegar</Link>
            </li>      
            <li>
              <Link to="/">Radio</Link>
            </li>      
          </Nav>
          <Nav>
            <li>  
              <a href="">SUA BIBLIOTECA</a>
            </li>      
            <li>
              <a href="">Seu Daily Mix</a>
            </li>      
            <li>
              <a href="">Tocados Recentemente</a>
            </li>      
            <li>
              <a href="">Músicas</a>
            </li>      
            <li>
              <a href="">Álbums</a>
            </li>      
            <li>
              <a href="">Artistas</a>
            </li>      
            <li>
              <a href="">Estações</a>
            </li>      
            <li>
              <a href="">Arquivos locais</a>
            </li>      
            <li>
              <a href="">Vídeos</a>
            </li>      
            <li>
              <a href="">Podcasts</a>
            </li>      
          </Nav>
          <Nav>
            <li>
              <span>
                <a href="#">PLAYLISTS</a></span>
            </li>
            {this.props.playlists.data.map(playlist => 
              <li key={playlist.id}>
                <Link to={`/playlists/${playlist.id}`}>{playlist.title}</Link>
              </li>      
            )}
          </Nav>
        </div>
        <NewPlaylist>
          <img src={AddPlaylistIcon} alt="Adicionar Playlist" />
          Nova Playlist
        </NewPlaylist>
    </Container>
    )
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)