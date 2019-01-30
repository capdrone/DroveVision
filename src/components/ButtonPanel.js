import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const getInstruction = (name, distance, speed, type) => {
  let xyz;
  let z;
  switch (type) {
    case 'Current':
      z = 0;
      break;
    case 'Up':
      z = distance;
      break;
    case 'Down':
      z = -distance;
      break;
    default:
      z = null;
  }
  switch (name) {
    case 'forward-left':
      xyz = `${distance} ${distance} ${z}`;
      break;
    case 'forward':
      xyz = `${distance} 0 ${z}`;
      break;
    case 'forward-right':
      xyz = `${distance} -${distance} ${z}`;
      break;
    case 'left':
      xyz = `0 ${distance} ${z}`;
      break;
    case 'right':
      xyz = `0 -${distance} ${z}`;
      break;
    case 'reverse-left':
      xyz = `-${distance} ${distance} ${z}`;
      break;
    case 'reverse':
      xyz = `-${distance} 0 ${z}`;
      break;
    case 'reverse-right':
      xyz = `-${distance} -${distance} ${z}`;
      break;
    case 'straight-up':
      xyz = `0 0 ${z}`;
      break;
    case 'straight-down':
      xyz = `0 0 ${z}`;
      break;
    default:
      xyz = '';
  }
  return `go ${xyz} ${speed}`;
};

const renderCenterButton = (
  type,
  distance,
  speed,
  addFlightInstruction,
  allDisabled
) => {
  switch (type) {
    case 'Current':
      return (
        <Button
          disabled={allDisabled}
          onClick={() => addFlightInstruction('hold', 'Hold')}
        >
          <Button.Content visible>
            <Icon className="hold" name="hourglass half" />
          </Button.Content>
        </Button>
      );
    case 'Up':
      return (
        <Button
          disabled={allDisabled}
          onClick={() =>
            addFlightInstruction(
              getInstruction('straight-up', distance, speed, type),
              `Up --> ${distance / 100} m`
            )
          }
        >
          <Button.Content visible>
            <Icon className="straight-up" name="arrow circle up" />
          </Button.Content>
        </Button>
      );
    case 'Down':
      return (
        <Button
          disabled={allDisabled}
          onClick={() =>
            addFlightInstruction(
              getInstruction('straight-down', distance, speed, type),
              `Down --> ${distance / 100} m`
            )
          }
        >
          <Button.Content visible>
            <Icon className="straight-down" name="arrow circle down" />
          </Button.Content>
        </Button>
      );
    default:
      return null;
  }
};

const ButtonPanel = props => {
  const {
    type,
    distance,
    speed,
    addFlightInstruction,
    leftDisabled,
    rightDisabled,
    forwardDisabled,
    reverseDisabled,
    allDisabled,
  } = props;
  const prefix = type === 'Current' ? '' : `${type} + `;
  return (
    <table>
      <tbody>
        <tr>
          <td />
          <td />
        </tr>
        <tr>
          <td>
            <Button
              disabled={leftDisabled || forwardDisabled || allDisabled}
              onClick={() =>
                addFlightInstruction(
                  getInstruction('forward-left', distance, speed, type),
                  `${prefix}Forward + Left --> ${distance / 100} m`
                )
              }
            >
              <Button.Content visible>
                <Icon className="f-left" name="arrow up" />
              </Button.Content>
            </Button>
          </td>
          <td>
            <Button
              disabled={forwardDisabled || allDisabled}
              onClick={() =>
                addFlightInstruction(
                  getInstruction('forward', distance, speed, type),
                  `${prefix}Forward --> ${distance / 100} m`
                )
              }
            >
              <Button.Content visible>
                <Icon className="forward" name="arrow up" />
              </Button.Content>
            </Button>
          </td>
          <td>
            <Button
              disabled={rightDisabled || forwardDisabled || allDisabled}
              onClick={() =>
                addFlightInstruction(
                  getInstruction('forward-right', distance, speed, type),
                  `${prefix}Forward + Right --> ${distance / 100} m`
                )
              }
            >
              <Button.Content visible>
                <Icon className="f-right" name="arrow up" />
              </Button.Content>
            </Button>
          </td>
        </tr>
        <tr>
          <td>
            <Button
              disabled={leftDisabled || allDisabled}
              onClick={() =>
                addFlightInstruction(
                  getInstruction('left', distance, speed, type),
                  `${prefix}Left --> ${distance / 100} m`
                )
              }
            >
              <Button.Content visible>
                <Icon className="left" name="arrow left" />
              </Button.Content>
            </Button>
          </td>
          <td>
            {renderCenterButton(
              type,
              distance,
              speed,
              addFlightInstruction,
              allDisabled
            )}
          </td>
          <td>
            <Button
              disabled={rightDisabled || allDisabled}
              onClick={() =>
                addFlightInstruction(
                  getInstruction('right', distance, speed, type),
                  `${prefix}Right --> ${distance / 100} m`
                )
              }
            >
              <Button.Content visible>
                <Icon className="right" name="arrow right" />
              </Button.Content>
            </Button>
          </td>
        </tr>
        <tr>
          <td>
            <Button
              disabled={leftDisabled || reverseDisabled || allDisabled}
              onClick={() =>
                addFlightInstruction(
                  getInstruction('reverse-left', distance, speed, type),
                  `${prefix}Reverse + Left --> ${distance / 100} m`
                )
              }
            >
              <Button.Content visible>
                <Icon className="b-left" name="arrow down" />
              </Button.Content>
            </Button>
          </td>
          <td>
            <Button
              disabled={reverseDisabled || allDisabled}
              onClick={() =>
                addFlightInstruction(
                  getInstruction('reverse', distance, speed, type),
                  `${prefix}Reverse --> ${distance / 100} m`
                )
              }
            >
              <Button.Content visible>
                <Icon className="back" name="arrow down" />
              </Button.Content>
            </Button>
          </td>
          <td>
            <Button
              disabled={rightDisabled || reverseDisabled || allDisabled}
              onClick={() =>
                addFlightInstruction(
                  getInstruction('reverse-right', distance, speed, type),
                  `${prefix}Reverse + Right --> ${distance / 100} m`
                )
              }
            >
              <Button.Content visible>
                <Icon className="b-right" name="arrow down" />
              </Button.Content>
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ButtonPanel;
