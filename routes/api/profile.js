const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route GET api/profile/m
//@desc Get curr users profile
//@access private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for this user' });
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route GET api/profile/profile
//@desc Create or update user profile
//@access private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;

    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
    res.send('Hello');
  }
);

//@route GET api/profile
//@desc Get all profiles
//@access public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/profile/user/:user_id
//@desc Get profile by user id
//@access public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route Delete api/profile
//@desc Delete profile/user/posts
//@access private
router.delete('/', auth, async (req, res) => {
  try {
    // - remove users posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/profile/experience
//@desc  profile/user/posts
//@access private
router.post(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELete api/profile/experience
//@desc Delete experience from profile
//@access private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route Put api/profile/education
//@desc Add profile education
//@access private
router.post(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELete api/profile/education/:edu_id
//@desc Delete education from profile
//@access private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route edit api/profile/education/:edu_id
//@desc edit education from profile
//@access private
router.post(
  '/education/:edu_id',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //Get replace index
      const replaceIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
      profile.education.splice(replaceIndex, 1, newEdu);
      await profile.save();
      //console.log(profile);
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route edit api/profile/experience/:exp_id
//@desc edit experience from profile
//@access private
router.post(
  '/experience/:exp_id',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //Get replace index
      const replaceIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
      profile.experience.splice(replaceIndex, 1, newExp);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${config.get(
          'githubClientId'
        )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      res.json(JSON.parse(body));
      0;
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/profile/course
//@desc Add profile course
//@access private
router.post(
  '/course',
  [
    auth,
    [
      check('title', 'Course title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title } = req.body;
    const newCourse = {
      title
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.courses.push(newCourse);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/profile/course/:course_id
//@desc Delete course from profile
//@access private
router.delete('/course/:course_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get remove index
    const removeIndex = profile.courses
      .map(item => item.id)
      .indexOf(req.params.course_id);
    profile.courses.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

//@route POST api/profile/course/:coure_id
//@desc edit course from profile
//@access private
router.post(
  '/course/:course_id',
  [
    auth,
    [
      check('title', 'Course title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title } = req.body;
    const newCourse = {
      title
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      //Get replace index
      const replaceIndex = profile.courses
        .map(item => item.id)
        .indexOf(req.params.edu_id);
      profile.courses.splice(replaceIndex, 1, newCourse);
      await profile.save();
      //console.log(profile);
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route POST api/profile/upload
//@desc upload avatar from client to Cloudinary through our server, using Multer.
//We are not using it in the current version of our project.
// We instead upload avatar from client directly to Cloudinary.

//@access private

const multer = require('multer');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: config.get('cloud_name'),
  api_key: config.get('api_key'),
  api_secret: config.get('api_secret')
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/upload', [auth, upload.single('photo')], async (req, res) => {
  cloudinary.uploader
    .upload_stream(async result => {
      try {
        let profile = await Profile.findOne({ user: req.user.id });
        profile.images.picture = result.secure_url.toString();
        await profile.save(function (err) {
          if (err) console.log('error while saving');
        });
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    })
    .end(req.file.buffer);
});


//===============

//@route POST api/profile/avatar
//@desc upload avatar for profile
//@access private

router.post('/avatar', auth, async (req, res) => {
  try {
    // console.log("server: req.body:  ", req.body);
    let profile = await Profile.findOne({ user: req.user.id });
    profile.images.picture = req.body.picture;
    await profile.save();
    //console.log("changed profile:", profile);
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route POST api/profile/cover
//@desc upload cover for profile
//@access private

router.post('/cover', auth, async (req, res) => {
  try {
    // console.log("server: req.body:  ", req.body);
    let profile = await Profile.findOne({ user: req.user.id });
    profile.images.cover = req.body.cover;
    await profile.save();
    //console.log("changed profile:", profile);
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route POST api/profile/resume
//@desc upload resume for profile
//@access private

router.post('/resume', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.resume.url = req.body.url;
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route DELETE api/profile / resume
//@desc Delete resume from profile
//@access private
router.delete('/resume', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.resume.url = '';
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


//==========================

// Upload picture to store on our server. We don't use for this version of project, as we store
// users images on Cloudinary instead.

// @route POST api/profile/uploadPic
// @desc Test route
// @access public
// const uploadToImagesFolder = multer({ dest: "images/" });

// router.post(
//   "/uploadPic",
//   uploadToImagesFolder.single("picture"),
//   (req, res) => {
//     //this will upload
//     // to images folder, because  uploadToImagesFolder = multer({ dest: "images/" });
//     try {
//       console.log("req.file: ", req.file);
//       res.send(req.file);
//     } catch (err) {
//       res.send(400);
//     }
//   }
// );

module.exports = router;
