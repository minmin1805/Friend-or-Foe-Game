// Centralized asset mapping for prepared profile images.
// Uses Vite's import.meta.glob so you don't have to hand-import every image.

const avatarModules = import.meta.glob(
  '../assets/Images/ProfilePage/ProfileImages/*/avatar.png',
  { eager: true, import: 'default' },
)

const photoModules = import.meta.glob(
  '../assets/Images/ProfilePage/ProfileImages/*/photo_*.png',
  { eager: true, import: 'default' },
)

// Some profiles may use a different naming pattern like `taylor_photo1.png`
// instead of `photo_1.png`. Support both.
const altPhotoModules = import.meta.glob(
  '../assets/Images/ProfilePage/ProfileImages/*/*_photo*.png',
  { eager: true, import: 'default' },
)

const combinedPhotoModules = { ...photoModules, ...altPhotoModules }

function extractProfileId(path) {
  // Example key:
  // ../assets/Images/ProfilePage/ProfileImages/Profile10-emma/avatar.png
  const m = /Profile(\d+)-/.exec(path)
  return m ? String(m[1]) : null
}

function extractPhotoNumber(path) {
  // Examples:
  // .../photo_2.png
  // .../taylor_photo2.png
  const m = /photo_?(\d+)\.png$/.exec(path)
  return m ? Number(m[1]) : null
}

export const avatarByProfileId = Object.entries(avatarModules).reduce((acc, [key, src]) => {
  const profileId = extractProfileId(key)
  if (!profileId) return acc
  acc[profileId] = src
  return acc
}, {})

export const photosByProfileId = Object.entries(combinedPhotoModules).reduce((acc, [key, src]) => {
  const profileId = extractProfileId(key)
  const n = extractPhotoNumber(key)
  if (!profileId || n == null) return acc
  if (!acc[profileId]) acc[profileId] = []
  acc[profileId].push({ n, src })
  return acc
}, {})

export const photoSrcByProfileIdAndNumber = Object.entries(combinedPhotoModules).reduce((acc, [key, src]) => {
  const profileId = extractProfileId(key)
  const n = extractPhotoNumber(key)
  if (!profileId || n == null) return acc
  if (!acc[profileId]) acc[profileId] = {}
  acc[profileId][n] = src
  return acc
}, {})

// Convert { n, src } arrays into sorted src arrays.
Object.entries(photosByProfileId).forEach(([profileId, items]) => {
  items.sort((a, b) => a.n - b.n)
  photosByProfileId[profileId] = items.map((x) => x.src)
})

export const getAvatarForProfileId = (profileId) => avatarByProfileId[String(profileId)] ?? null

export const getPhotosForProfileId = (profileId) => photosByProfileId[String(profileId)] ?? []

