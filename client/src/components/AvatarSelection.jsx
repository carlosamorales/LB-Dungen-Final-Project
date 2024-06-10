import React from 'react';
import '../styles/AvatarSelection.css';

const avatars = [
  '2525012_ant man_antenna_hero_super hero_icon.png',
  '2612562_hero_super girl_woman_wonder woman_icon.png',
  '2624889_hero_super_thor_wings_icon.png',
  '2625486_hero_super_hero_woman_icon.png',
  '2625503_hero_super girl_super hero_woman_icon.png',
  '2625504_hero_lady_queen_super girl_icon.png',
  '4043232_avatar_batman_comics_hero_icon.png',
  '4043270_avatar_joker_squad_suicide_woman_icon.png',
];

const AvatarSelection = ({ setAvatar }) => {
  return (
    <div className="avatar-selection">
      <p>Select an Avatar:</p>
      <div className="avatar-options">
        {avatars.map((avatar) => (
          <img
            key={avatar}
            src={`/src/assets/avatars/${avatar}`}
            alt={avatar}
            onClick={() => setAvatar(avatar)}
            className="avatar-option"
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarSelection;
