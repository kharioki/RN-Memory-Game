import React, { useState, useEffect } from 'react'
import {
  SafeAreaView, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Image
} from 'react-native'
// import Board from '../components/Board'

// import { cardImages } from '../utils/imageData'

export const cardImages = [
  { source: '../assets/img/ant-man.png', matched: false },
  { source: '../assets/img/black-panther.png', matched: false },
  { source: '../assets/img/black-widow.png', matched: false },
  { source: '../assets/img/captain-america.png', matched: false },
  { source: '../assets/img/captain-marvel.png', matched: false },
  { source: '../assets/img/falcon.png', matched: false },
  { source: '../assets/img/hawkeye.png', matched: false },
  { source: '../assets/img/hulk.png', matched: false },
  { source: '../assets/img/iron-man.png', matched: false },
  { source: '../assets/img/loki.png', matched: false },
  { source: '../assets/img/scarlet-witch.png', matched: false },
  { source: '../assets/img/spiderman.png', matched: false },
  { source: '../assets/img/thanos.png', matched: false },
  { source: '../assets/img/thor.png', matched: false },
  { source: '../assets/img/war-machine.png', matched: false },
  { source: '../assets/img/winter-soldier.png', matched: false },
]

const Card = ({ card, onPress }) => {
  console.log(card?.source)
  // const img = Image.resolveAssetSource(card?.source).uri
  // console.log(img)
  return (
    <View style={styles.card}>
      <Image source={card?.source ? require(`${card.source}`) : require('../assets/img/cover.jpg')} style={styles.front} />
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.back} source={require('../assets/img/cover.jpg')} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  )
}

const GameScreen = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // duplicate cards, randomize and shuffle
  const shuffleCards = () => {
    // first duplicate the cards
    const shuffledCards = [...cardImages, ...cardImages]
      // sort and shuffle
      .sort(() => Math.random() - 0.5)
      // map and return an id for each card
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards)
    setTurns(0)
  }

  // start game on page load
  // useEffect(() => {
  //   shuffleCards()
  // }, [])

  const renderRows = () => {
    const rows = []
    for (let i = 0; i < 8; i++) {
      rows.push(
        <View key={i} style={styles.row}>
          {renderCells(i)}
        </View>
      )
    }
    return rows
  }

  const renderCells = (rowIndex) => {
    const cells = []
    for (let i = 0; i < 4; i++) {
      let index = rowIndex * 4 + i
      cells.push(
        <Card key={i} card={cards[index]} onPress={() => console.log('pressed')} />
      )
    }
    return cells
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Magic Memory</Text>
        <Text style={styles.subtitle}>(Marvel Edition)</Text>
        <TouchableHighlight
          underlayColor="#f00"
          activeOpacity={0.6}
          style={styles.button}
          onPress={shuffleCards}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.gridContainer}>
        {renderRows()}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'column',
    width: '100%',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    height: 80,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    margin: 5,
  },
  front: {
    height: 60,
    width: 60,
  },
  back: {
    height: 60,
    width: 60,
  },
})

export default GameScreen
