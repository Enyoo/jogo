import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [tela,setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');

  function iniciarJogo(jogador){
    setJogadorAtual(jogador);

    setJogadasRestantes(9);

    setTabuleiro([
                ['','',''],
                ['','',''],
                ['','','']
              ]);

    setTela('jogo');
  }

  function jogada(row, col){
    tabuleiro[row][col] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');

    verificarGanhador(tabuleiro, row, col)
  }

  function verificarGanhador(tab, row, col){
    if(tab[row][0] !== '' && tab[row][0] === tab[row][1] && tab[row][1] === tab[row][2]){
      return finalizarJogo(tab[row][col]);
    }

    if(tab[0][col] !== '' && tab[0][col] === tab[1][col] && tab[1][col] === tab[2][col]){
      return finalizarJogo(tab[row][col]);
    }

    if(tab[0][0] !== '' && tab[0][0] === tab[1][1] && tab[1][1] === tab[2][2]){
      return finalizarJogo(tab[row][col]);
    }

    if(tab[0][2] !== '' && tab[0][2] === tab[1][1] && tab[1][1] === tab[2][0]){
      return finalizarJogo(tab[row][col]);
    }

    if(jogadasRestantes - 1 === 0){
      return finalizarJogo('');
    }

    setJogadasRestantes((jogadasRestantes - 1));
  }

  function finalizarJogo(jogadorAtual){
    setGanhador((jogadorAtual));
    setTela('ganhador');
  }

  switch(tela)
  {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }

  function getTelaMenu()
  {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Jogo da Velha</Text>
        <Text style={styles.subtitle}>Selecione o primeiro jogador</Text>

        <View style={styles.inlineItems}>
          <TouchableOpacity 
            style={styles.boxJogador}
            onPress={() => iniciarJogo('X')}>
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.boxJogador}
            onPress={() => iniciarJogo('O')}>
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function getTelaJogo()
  {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Jogo da Velha</Text>

        {
          tabuleiro.map((row, numRow)=>{
            return (
              <View key={numRow} style={styles.inlineItems}>
                {
                  row.map((col,numCol) => {
                    return (
                      <TouchableOpacity 
                        key={numCol}
                        style={styles.boxJogador}
                        onPress={() => jogada(numRow, numCol)}
                        disabled={col !== ''}>
                        <Text style={col === 'X' ? styles.jogadorX : styles.jogadorO}>{col}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            );
          })
        }

        <TouchableOpacity
          style={styles.buttonMenu}
          onPress={()=> setTela('menu')}>
            <Text style={styles.textButtonMenu}>Voltar ao menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonMenu}
          onPress={()=> iniciarJogo(jogadorAtual)}>
            <Text style={styles.textButtonMenu}>Reiniciar o Jogo</Text>
        </TouchableOpacity>


        <TouchableOpacity 
            style={styles.boxJogador}
            onPress={() => iniciarJogo('X')}>
            <Text style={jogadorAtual == 'X' ? styles.jogadorX : styles.jogadorO}>{jogadorAtual}</Text>
          </TouchableOpacity>

      </View>
    );
  }

  function getTelaGanhador()
  {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Jogo da Velha</Text>
        <Text style={styles.subtitle}>Resultado final</Text>
        {
          ganhador === '' &&
          <Text style={styles.ganhador}>Nenhum ganhador</Text>
        }

        {
          ganhador !== '' &&
          <>
          
            <Text style={styles.ganhador}>Ganhador</Text>
            <View
                style={styles.boxJogador}
              >
              <Text style={ganhador == 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
          </>

        }
          <TouchableOpacity
            style={styles.buttonMenu}
            onPress={()=> setTela('menu')}>
              <Text style={styles.textButtonMenu}>Voltar ao menu</Text>
          </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  buttonMenu:{
    marginTop:20,
    color: '#da3f3f'
  },
  textButtonMenu:{
    color: '#4e6fe4'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: "#333"
  },  
  subtitle:{
    fontSize: 20,
    color: "#555"
  },
  boxJogador:{
    margin: 5,
    alignItems:'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: "#ddd"
  },
  jogadorO:{
    fontSize: 40,
    color: '#da3f3f'
  },
  jogadorX:{
    fontSize: 40,
    color: '#553aaa'
  },
  inlineItems:{
    flexDirection: 'row',
  },
  ganhador:{
    color:'#333',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
