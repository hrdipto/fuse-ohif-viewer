import React from 'react';
import adjust from './icons/adjust.js';
// Icons
import trash from './trash.js'
import angleDoubleDown from './icons/angle-double-down.js';
import angleDoubleUp from './icons/angle-double-up.js';
import angleLeft from './icons/angle-left.js';
import arrows from './icons/arrows.js';
import arrowsAltH from './icons/arrows-alt-h.js';
import arrowsAltV from './icons/arrows-alt-v.js';
import bars from './icons/bars.js';
import brain from './icons/brain.js';
import brush from './icons/brush.js';
import caretDown from './icons/caret-down.js';
import caretUp from './icons/caret-up.js';
import check from './icons/check.js';
import checkCircle from './icons/check-circle.js';
import checkCircleO from './icons/check-circle-o.js';
import chevronDown from './icons/chevron-down.js';
import circle from './icons/circle.js';
import circleNotch from './icons/circle-notch.js';
import circleO from './icons/circle-o.js';
import clipboard from './icons/clipboard.js';
import cog from './icons/cog.js';
import createComment from './icons/create-comment.js';
import createScreenCapture from './icons/create-screen-capture.js';
import crosshairs from './icons/crosshairs.js';
import cube from './icons/cube.js';
import d3Rotate from './icons/3d-rotate.js';
import database from './icons/database.js';
import dotCircle from './icons/dot-circle.js';
import edit from './icons/edit.js';
import ellipseCircle from './icons/ellipse-circle.js';
import ellipseH from './icons/ellipse-h.js';
import ellipseV from './icons/ellipse-v.js';
import exclamationCircle from './icons/exclamation-circle.js';
import exclamationTriangle from './icons/exclamation-triangle.js';
import fastBackward from './icons/fast-backward.js';
import fastForward from './icons/fast-forward.js';
import stop from './icons/stop.js';
import info from './icons/info.js';
import inlineEdit from './icons/inline-edit.js';
import level from './icons/level.js';
import link from './icons/link.js';
import linkCircles from './icons/link-circles.js';
import list from './icons/list.js';
import liver from './icons/liver.js';
import lock from './icons/lock.js';
import lockAlt from './icons/lock-alt.js';
import lung from './icons/lung.js';
import measureNonTarget from './icons/measure-non-target.js';
import measureTarget from './icons/measure-target.js';
import measureTargetCr from './icons/measure-target-cr.js';
import measureTargetNe from './icons/measure-target-ne.js';
import measureTargetUn from './icons/measure-target-un.js';
import measureTemp from './icons/measure-temp.js';
import objectGroup from './icons/object-group.js';
import ohifLogo from './icons/ohif-logo.js';
import ohifTextLogo from './icons/ohif-text-logo.js';
import oval from './icons/oval.js';
import palette from './icons/palette.js';
import play from './icons/play.js';
import plus from './icons/plus.js';
import powerOff from './icons/power-off.js';
import reset from './icons/reset.js';
import rotate from './icons/rotate.js';
import rotateRight from './icons/rotate-right.js';
import saveRegular from './icons/save-regular.js';
import scissors from './icons/scissors.js';
import search from './icons/search.js';
import searchPlus from './icons/search-plus.js';
import softTissue from './icons/soft-tissue.js';
import sort from './icons/sort.js';
import sortDown from './icons/sort-down.js';
import sortUp from './icons/sort-up.js';
import sphere from './icons/sphere.js';
import squareO from './icons/square-o.js';
import star from './icons/star.js';
import stepBackward from './icons/step-backward.js';
import stepForward from './icons/step-forward.js';
import sun from './icons/sun.js';
import th from './icons/th.js';
import thLarge from './icons/th-large.js';
import thList from './icons/th-list.js';
import times from './icons/times.js';
// import trash from './icons/trash.js';
import unlink from './icons/unlink.js';
import user from './icons/user.js';
import youtube from './icons/youtube.js';
import eye from './icons/eye.js';
import eyeClosed from './icons/eye-closed.js';
import envelopeSquare from './icons/envelope-square.js';

const ICONS = {
  eye,
  'eye-closed': eyeClosed,
  brush,
  scissors,
  user,
  sort,
  th,
  star,
  'sort-up': sortUp,
  sphere,
  'sort-down': sortDown,
  info,
  cube,
  crosshairs,
  'dot-circle': dotCircle,
  'angle-left': angleLeft,
  '3d-rotate': d3Rotate,
  plus,
  'chevron-down': chevronDown,
  'angle-double-down': angleDoubleDown,
  'angle-double-up': angleDoubleUp,
  'arrows-alt-h': arrowsAltH,
  'arrows-alt-v': arrowsAltV,
  bars,
  'caret-down': caretDown,
  'caret-up': caretUp,
  'check-circle-o': checkCircleO,
  check,
  circle,
  'circle-o': circleO,
  times,
  'create-comment': createComment,
  'create-screen-capture': createScreenCapture,
  edit,
  'fast-backward': fastBackward,
  'fast-forward': fastForward,
  'object-group': objectGroup,
  search,
  'power-off': powerOff,
  'inline-edit': inlineEdit,
  list,
  'ohif-logo': ohifLogo,
  'ohif-text-logo': ohifTextLogo,
  lock,
  play,
  database,
  cog,
  'circle-notch': circleNotch,
  'square-o': squareO,
  'check-circle': checkCircle,
  'lock-alt': lockAlt,
  'step-backward': stepBackward,
  'step-forward': stepForward,
  clipboard: clipboard,
  stop,
  'th-large': thLarge,
  'th-list': thList,
  sun,
  palette,
  youtube,
  oval,
  'ellipse-h': ellipseH,
  'ellipse-v': ellipseV,
  adjust,
  level,
  'link-circles': linkCircles,
  'search-plus': searchPlus,
  'measure-non-target': measureNonTarget,
  'measure-target': measureTarget,
  'measure-target-cr': measureTargetCr,
  'measure-target-un': measureTargetUn,
  'measure-target-ne': measureTargetNe,
  'measure-temp': measureTemp,
  'ellipse-circle': ellipseCircle,
  arrows,
  reset,
  rotate,
  'rotate-right': rotateRight,
  'trash': trash,
  unlink,
  'exclamation-circle': exclamationCircle,
  link,
  'exclamation-triangle': exclamationTriangle,
  brain,
  'soft-tissue': softTissue,
  lung,
  liver,
  save: saveRegular,
  'envelope-square': envelopeSquare,
};

/**
 * Return the matching SVG Icon as a React Component.
 * Results in an inlined SVG Element. If there's no match,
 * return `null`
 */
export default function getIcon(key, props) {
  if (!key || !ICONS[key]) {
    return React.createElement('div', null, 'Missing Icon');
  }
 
  // return React.createElement(ICONS[key], props);
  // return (<img src={ICONS[key]} alt="React Logo" />);
  return (ICONS[key]);
}

export { ICONS };
