import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react"
import {
  followUser,
  getFollowingDoc,
  unFollowUser,
} from "../../../app/firestore/firestoreService"
import { setFollowUser, setUnFollowUser } from "../profileActions"

export default function ProfileHeader({ profile, isCurrentUser }) {
  const [loading, setLoading] = useState(false)
  const { followingUser } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isCurrentUser) return
    setLoading(true)
    async function fetchFollowDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id)
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser())
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchFollowDoc().then(() => setLoading(false))
  }, [dispatch, profile.id, isCurrentUser])

  async function handleFollowUser() {
    setLoading(true)
    try {
      await followUser(profile)
      dispatch(setFollowUser())
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleUnFollowUser() {
    setLoading(true)
    try {
      await unFollowUser(profile)
      dispatch(setUnFollowUser())
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label='Followers' value={profile.followerCount || 0} />
            <Statistic label='Following' value={profile.followingCount || 0} />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button
                    fluid
                    color='teal'
                    content={followingUser ? "Following" : "Not Following"}
                  />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    onClick={
                      followingUser
                        ? () => handleUnFollowUser()
                        : () => handleFollowUser()
                    }
                    loading={loading}
                    basic
                    fluid
                    color={followingUser ? "red" : "green"}
                    content={followingUser ? "Unfollow" : "Follow"}
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
