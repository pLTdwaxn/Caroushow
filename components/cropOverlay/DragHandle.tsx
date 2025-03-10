import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { BlurView } from 'expo-blur';

import { ParamState, RootState, socialMediaState } from '@/types';
import { connect } from 'react-redux';

import { cycleSlices } from '@/utils/utils';

type DragHandleProps = {
  param: ParamState;
  socialMedia: socialMediaState;
};

const DragHandle = ({ param, socialMedia }: DragHandleProps) => {
  const { aspectRatio, slices } = param;
  const colors = () =>
    aspectRatio < socialMedia.minRatio || aspectRatio > socialMedia.maxRatio
      ? { backgroundColor: 'rgba(255, 140, 140, 0.5)' }
      : { backgroundColor: 'rgba(140, 255, 140, 0.5)' };

  return (
    <BlurView style={[styles.dragHandle, colors()]} collapsable={false}>
      <View style={styles.flexItem}>
        <Text style={styles.aspectRatioLabel}></Text>
      </View>
      <View style={styles.flexItem}>
        <Text style={styles.aspectRatioLabel} onPress={cycleSlices}>
          {slices.toString()}
        </Text>
      </View>
      <View style={styles.flexItem}>
        <Text style={styles.aspectRatioLabel}>{aspectRatio.toFixed(3)}</Text>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  dragHandle: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexItem: {
    flex: 1,
    alignItems: 'center',
  },
  aspectRatioLabel: {
    color: 'white',
    fontSize: 16,
  },
});

const mapStateToProps = (state: RootState) => ({
  param: state.param,
  socialMedia: state.socialMedia,
});

export default connect(mapStateToProps)(DragHandle);
