import React, {useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import RenderHTML from 'react-native-render-html';
import styles from './JobsDetail.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const JobsDetail = ({route}) => {
  const [job, setJob] = useState([]);
  const [fav, setFav] = useState([]);

  const {item} = route.params;
  const {width} = useWindowDimensions();

  const dispatch = useDispatch();

  const handleAdd = jobs => {
    setFav([...fav, job]);
    setJob('');
    const newList = [...fav];
    const index = fav.indexOf(jobs);
    newList.splice(index, 1);
    setJob(newList);
    dispatch({type: 'ADD_FAVORITIES', payload: {jobs}});
  };

  const handleSubmit = () => {
    Alert.alert(
      'CodeWork',
      'Your job application has been successfully submitted!',
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.jobs_info_container}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.location_container}>
            <Text style={styles.location_text}>Locations: </Text>
            <Text style={styles.location_text2}>{item.locations[0].name}</Text>
          </View>
          <View style={styles.level_container}>
            <Text style={styles.job_text}>Job Level: </Text>
            <Text style={styles.job_text2}>{item.levels[0].name}</Text>
          </View>
          <Text style={styles.bottom_header}>JOB DETAILS</Text>
        </View>
        <View style={styles.html_container}>
          <RenderHTML source={{html: item.contents}} contentWidth={width} />
        </View>
        <View style={styles.button_container}>
          <Button onPress={handleSubmit} color="#e53935" title="Submit" />
          <Button
            color="#e53935"
            title="Add Favorities"
            onPress={() => handleAdd(item)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default JobsDetail;
