import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { BlurView } from 'expo-blur';

import { ParamState, RootState, socialMediaState } from '@/types';
import { connect } from 'react-redux';

import { cycleSlices } from '@/utils/utils';
import {
  Gesture,
  GestureDetector,
  TapGesture,
} from 'react-native-gesture-handler';

type DragHandleProps = {
  aspectRatioLabel: number | string;
  param: ParamState;
  socialMedia: socialMediaState;
  tapOnAspectRatioLabel: TapGesture;
};

const DragHandle = ({
  aspectRatioLabel,
  param,
  socialMedia,
  tapOnAspectRatioLabel,
}: DragHandleProps) => {
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
      <TouchableOpacity style={styles.flexItem} onPress={cycleSlices}>
        <Text style={styles.aspectRatioLabel}>{slices.toString()}</Text>
      </TouchableOpacity>
      <GestureDetector gesture={tapOnAspectRatioLabel}>
        <View style={styles.flexItem}>
          <Text style={styles.aspectRatioLabel}>{aspectRatioLabel}</Text>
        </View>
      </GestureDetector>
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
  aspectRatioLabel: state.app.dragHandle.aspectRatioLabel,
  param: state.param,
  socialMedia: state.socialMedia,
});

export default connect(mapStateToProps)(DragHandle);
