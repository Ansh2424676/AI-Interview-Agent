def build_candidate_profile(candidate):

    return f"""
Name: {candidate.get('name')}

Role: {candidate.get('jobRole')}

Experience: {candidate.get('yearsExperience')} years

Education: {candidate.get('education')}
"""