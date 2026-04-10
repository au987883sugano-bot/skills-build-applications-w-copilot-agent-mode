
from django.core.management.base import BaseCommand
from django.conf import settings
import pymongo


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = pymongo.MongoClient('mongodb://localhost:27017/')
        db = client['octofit_db']

        # Clear collections
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Teams
        teams = [
            {'name': 'Marvel', 'description': 'Team Marvel'},
            {'name': 'DC', 'description': 'Team DC'},
        ]
        db.teams.insert_many(teams)

        # Users
        users = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'name': 'Captain America', 'email': 'cap@marvel.com', 'team': 'Marvel'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'DC'},
            {'name': 'Superman', 'email': 'superman@dc.com', 'team': 'DC'},
        ]
        db.users.insert_many(users)
        db.users.create_index('email', unique=True)

        # Activities
        activities = [
            {'user': 'Iron Man', 'activity': 'Running', 'duration': 30},
            {'user': 'Captain America', 'activity': 'Cycling', 'duration': 45},
            {'user': 'Batman', 'activity': 'Swimming', 'duration': 25},
            {'user': 'Superman', 'activity': 'Flying', 'duration': 60},
        ]
        db.activities.insert_many(activities)

        # Workouts
        workouts = [
            {'user': 'Iron Man', 'workout': 'Pushups', 'reps': 50},
            {'user': 'Captain America', 'workout': 'Situps', 'reps': 60},
            {'user': 'Batman', 'workout': 'Pullups', 'reps': 40},
            {'user': 'Superman', 'workout': 'Squats', 'reps': 70},
        ]
        db.workouts.insert_many(workouts)

        # Leaderboard
        leaderboard = [
            {'user': 'Iron Man', 'score': 100},
            {'user': 'Captain America', 'score': 90},
            {'user': 'Batman', 'score': 95},
            {'user': 'Superman', 'score': 110},
        ]
        db.leaderboard.insert_many(leaderboard)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data!'))
